import { useState, useEffect } from 'react';
import { type Route } from '@/data/routes';

const MAX_RECENT_ROUTES = 5;
const STORAGE_KEY = 'recent-routes';

export function useRecentRoutes() {
  const [recentRoutes, setRecentRoutes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentRoutes));
  }, [recentRoutes]);

  const addRecentRoute = (routeId: string) => {
    setRecentRoutes(prev => {
      const filtered = prev.filter(id => id !== routeId);
      return [routeId, ...filtered].slice(0, MAX_RECENT_ROUTES);
    });
  };

  const clearRecentRoutes = () => {
    setRecentRoutes([]);
  };

  return { recentRoutes, addRecentRoute, clearRecentRoutes };
}
