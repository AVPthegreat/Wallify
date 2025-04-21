
import { useState, useEffect } from "react";
import axios from "axios";

export interface UnsplashImage {
  id: string;
  alt_description: string | null;
  urls: { small: string; regular: string; full: string };
  user: { name: string };
  links: { download: string };
  width: number;
  height: number;
  description: string | null;
}

const CATEGORY_QUERIES: Record<string, string> = {
  All: "",
  Space: "space",
  Nature: "nature",
  Minimal: "minimal",
  Mountains: "mountains",
  Cyberpunk: "cyberpunk",
  Anime: "anime",
  Technology: "technology",
  Waves: "waves",
  Lake: "lake",
  Abstract: "abstract",
};

export const categories = Object.keys(CATEGORY_QUERIES);

interface UseUnsplashProps {
  category?: string;
  query?: string;
  page?: number;
  perPage?: number;
}

// Get API key from localStorage first, then fallback to env variable
const getAccessKey = () => {
  return localStorage.getItem("UNSPLASH_ACCESS_KEY") || import.meta.env.VITE_UNSPLASH_ACCESS_KEY || "";
}

export const ACCESS_KEY = getAccessKey();

export function setUnsplashAccessKey(key: string) {
  localStorage.setItem("UNSPLASH_ACCESS_KEY", key);
  window.location.reload();
}

export function useUnsplashWallpapers({
  category = "All",
  query = "",
  page = 1,
  perPage = 12,
}: UseUnsplashProps) {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentKey = getAccessKey();
    
    if (!currentKey) {
      setError("Unsplash API key not set.");
      setImages([]);
      setTotal(0);
      return;
    }
    
    setError(null);
    setLoading(true);

    // Build query
    let q = "";
    if (category && category !== "All") {
      q = CATEGORY_QUERIES[category] || "";
    }
    if (query) {
      q = query;
    }

    axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query: q || "wallpapers",
        page,
        per_page: perPage,
        orientation: "landscape",
      },
      headers: {
        Authorization: "Client-ID " + currentKey,
      },
    })
      .then(res => {
        setImages(res.data.results);
        setTotal(res.data.total || 0);
        setLoading(false);
      })
      .catch(e => {
        setError(e?.message || "Failed to fetch");
        setLoading(false);
      });
  }, [category, query, page, perPage]);

  return { images, total, loading, error };
}
