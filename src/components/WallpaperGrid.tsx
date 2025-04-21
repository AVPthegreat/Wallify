
import React from "react";
import WallpaperCard from "./WallpaperCard";
import { UnsplashImage } from "@/hooks/useUnsplashWallpapers";

interface WallpaperGridProps {
  wallpapers: UnsplashImage[];
  onWallpaperClick: (wallpaper: UnsplashImage) => void;
  isLoading?: boolean;
  error?: string | null;
}

const WallpaperGrid: React.FC<WallpaperGridProps> = ({
  wallpapers,
  onWallpaperClick,
  isLoading,
  error,
}) => {
  if (error) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl text-red-500">Error: {error}</h3>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-wallflix-purple border-t-transparent mx-auto rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!wallpapers || wallpapers.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl text-gray-400">No wallpapers found</h3>
        <p className="text-gray-500 mt-2">Try a different search or category</p>
      </div>
    )
  }
  return (
    <div className="container mx-auto px-4 pt-8 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wallpapers.map((wallpaper) => (
          <WallpaperCard
            key={wallpaper.id}
            wallpaper={wallpaper}
            onClick={onWallpaperClick}
            isUnsplash
          />
        ))}
      </div>
    </div>
  );
};

export default WallpaperGrid;
