import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { storage } from "../utils/storage";

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1`;

type ContentType = 'listings' | 'events' | 'news' | 'knowledge';

let apiConnectionChecked = false;
let apiAvailable = false;

export function useContent<T>(type: ContentType) {
  // Load localStorage immediately as initial data (stale-while-revalidate)
  const [data, setData] = useState<T[]>(() => storage.getContent<T>(type));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'api' | 'localStorage'>('localStorage');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);

        // If we already have localStorage data, mark as not loading
        const localData = storage.getContent<T>(type);
        if (localData.length > 0) {
          setData(localData);
          setSource('localStorage');
          setLoading(false);
        }

        // Then try API in background
        if (!apiConnectionChecked || apiAvailable) {
          const url = `${SERVER_URL}/make-server-34132228/content/${type}`;

          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const res = await fetch(url, {
              headers: {
                'Authorization': `Bearer ${publicAnonKey}`,
                'Content-Type': 'application/json'
              },
              mode: 'cors',
              signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (res.ok) {
              const jsonData = await res.json();
              const items = Array.isArray(jsonData) ? jsonData : [];

              if (!apiAvailable) {
                apiAvailable = true;
                apiConnectionChecked = true;
              }

              // Only update if API returned data
              if (items.length > 0) {
                storage.saveContent(type, items);
                setData(items);
                setSource('api');
              }
              setError(null);
              return;
            }
          } catch {
            if (!apiConnectionChecked) {
              apiConnectionChecked = true;
              apiAvailable = false;
            }
          }
        }

        // If no data yet, set localStorage data
        if (localData.length > 0 && data.length === 0) {
          setData(localData);
          setSource('localStorage');
        }
        setError(null);

      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const refresh = () => {
    window.location.reload();
  };

  return { data, loading, error, refresh, source };
}
