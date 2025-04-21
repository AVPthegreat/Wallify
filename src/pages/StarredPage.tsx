
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import WallpaperGrid from "@/components/WallpaperGrid";
import WallpaperModal from "@/components/WallpaperModal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import type { UnsplashImage } from "@/hooks/useUnsplashWallpapers";

const StarredPage: React.FC = () => {
  const [selectedWallpaper, setSelectedWallpaper] = React.useState<UnsplashImage | null>(null);
  const navigate = useNavigate();

  const handleWallpaperClick = (wallpaper: UnsplashImage) => {
    setSelectedWallpaper(wallpaper);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedWallpaper(null);
    document.body.style.overflow = "auto";
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar onSearch={() => {}} />
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2 text-glow">
              Starred Wallpapers Unavailable
            </h1>
            <p className="text-gray-400 mb-6">
              The starred wallpapers feature is no longer available because login and Supabase were removed.
            </p>
            <Button
              onClick={handleBackToHome}
              className="bg-wallflix-purple hover:bg-wallflix-purple/80 text-white button-glow"
            >
              Browse Wallpapers
            </Button>
          </div>
          <WallpaperGrid
            wallpapers={[]}
            onWallpaperClick={handleWallpaperClick}
          />
        </div>
      </div>
      <Footer />
      {selectedWallpaper && (
        <WallpaperModal
          wallpaper={selectedWallpaper}
          onClose={handleCloseModal}
          isUnsplash
        />
      )}
    </>
  );
};

export default StarredPage;
