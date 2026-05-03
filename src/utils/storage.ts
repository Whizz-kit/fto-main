// Storage utility that uses localStorage as primary storage
// This ensures the CMS works even if the Edge Function is not deployed yet

type ContentType = 'listings' | 'events' | 'news' | 'knowledge';

const STORAGE_PREFIX = 'fto_cms_';

export const storage = {
  getContent<T>(type: ContentType): T[] {
    try {
      const key = `${STORAGE_PREFIX}${type}`;
      const data = localStorage.getItem(key);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  saveContent(type: ContentType, data: unknown[]): void {
    try {
      const key = `${STORAGE_PREFIX}${type}`;
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      throw err;
    }
  },

  clearAll(): void {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX));
    keys.forEach(key => localStorage.removeItem(key));
  },

  hasContent(type: ContentType): boolean {
    const key = `${STORAGE_PREFIX}${type}`;
    return localStorage.getItem(key) !== null;
  }
};
