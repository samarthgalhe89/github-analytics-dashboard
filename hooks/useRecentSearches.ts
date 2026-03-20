import { useState, useEffect } from "react";

const MAX_HISTORY = 5;

export function useRecentSearches(namespace: string) {
  const HISTORY_KEY = `github_recent_searches_${namespace}`;
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load search history", e);
    }
  }, [HISTORY_KEY]);

  const addSearch = (username: string) => {
    if (!username.trim()) return;
    
    setRecentSearches(prev => {
      // Remove the username if it already exists to move it to the front
      const filtered = prev.filter(name => name.toLowerCase() !== username.toLowerCase());
      
      // Add to front and slice to max length
      const updated = [username, ...filtered].slice(0, MAX_HISTORY);
      
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save search history", e);
      }
      
      return updated;
    });
  };

  const removeSearch = (username: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(name => name.toLowerCase() !== username.toLowerCase());
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to update search history", e);
      }
      return updated;
    });
  };

  return { recentSearches, addSearch, removeSearch };
}
