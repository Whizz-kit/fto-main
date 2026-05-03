import { projectId, publicAnonKey } from "./supabase/info";
import { storage } from "./storage";

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-34132228`;

let apiOnline = false;

export const api = {
  async getContent(type: 'listings' | 'events' | 'news' | 'knowledge', strict = false) {
    try {
      const url = `${SERVER_URL}/content/${type}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        mode: 'cors',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const items = Array.isArray(data) ? data : [];

      storage.saveContent(type, items);
      apiOnline = true;

      return items;
    } catch (err) {
      if (strict) throw err;
      return storage.getContent(type);
    }
  },

  async saveContent(type: string, data: unknown[], token: string) {
    storage.saveContent(type as 'listings' | 'events' | 'news' | 'knowledge', data);

    const url = `${SERVER_URL}/content/${type}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
      mode: 'cors',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      apiOnline = true;
      return await res.json();
    }

    const errorText = await res.text();
    throw new Error(`Server Error: ${res.status} ${errorText}`);
  },

  async uploadFile(file: File, token: string) {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${SERVER_URL}/upload`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
        mode: 'cors',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        let errorMsg;
        try {
          const err = await res.json();
          errorMsg = err.error || JSON.stringify(err);
        } catch {
          errorMsg = await res.text();
        }
        throw new Error(errorMsg || "Upload failed");
      }

      return await res.json();
    } catch {
      // Fallback: create a local object URL (temporary preview only)
      const objectUrl = URL.createObjectURL(file);
      return { url: objectUrl, localOnly: true };
    }
  },

  async testConnection() {
    try {
      const url = `${SERVER_URL}/health`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        mode: 'cors',
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      apiOnline = true;
      return { connected: true, data };
    } catch (err) {
      apiOnline = false;
      return { connected: false, error: err };
    }
  }
};

export { SERVER_URL };
