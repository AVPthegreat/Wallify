
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type { UnsplashImage } from "@/hooks/useUnsplashWallpapers";

interface WallpaperCardProps {
  wallpaper: UnsplashImage;
  onClick: (wallpaper: UnsplashImage) => void;
  isUnsplash?: boolean;
}

const WallpaperCard: React.FC<WallpaperCardProps> = ({ wallpaper, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="relative overflow-hidden rounded-lg hover-card cursor-pointer group"
      onClick={() => onClick(wallpaper)}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-wallflix-dark-purple">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-wallflix-purple to-wallflix-blue animate-pulse flex items-center justify-center">
            <svg className="w-8 h-8 text-white/30 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-70" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
          </div>
        </div>
      )}
      <img
        src={wallpaper.urls.small}
        alt={wallpaper.alt_description || wallpaper.description || "Wallpaper"}
        className={cn(
          "w-full h-64 object-cover transition-all duration-300 group-hover:scale-105",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-medium text-lg truncate">{wallpaper.alt_description || wallpaper.description || "Untitled"}</h3>
          <p className="text-gray-300 text-sm">by {wallpaper.user.name}</p>
        </div>
      </div>
    </div>
  );
};
export default WallpaperCard;
