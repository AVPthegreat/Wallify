
import React, { useState } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { UnsplashImage } from "@/hooks/useUnsplashWallpapers";

interface WallpaperModalProps {
  wallpaper: UnsplashImage | null;
  onClose: () => void;
  isUnsplash?: boolean;
}

const WallpaperModal: React.FC<WallpaperModalProps> = ({ wallpaper, onClose, isUnsplash }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    if (!wallpaper) return;
    let url = wallpaper.urls.full || wallpaper.urls.regular || wallpaper.urls.small;
    // For Unsplash, force download via their download endpoint
    if (isUnsplash && wallpaper.links.download) {
      url = wallpaper.links.download;
      window.open(url, "_blank", "noopener"); // Open Unsplash download link for analytics
      toast.success("Download started! (If the image doesn't download, right-click and save image.)");
      return;
    }
    // fallback: just open image
    const link = document.createElement("a");
    link.href = url;
    link.download = (wallpaper.alt_description || wallpaper.description || "wallpaper").replace(/\s+/g, "_").toLowerCase() + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Wallpaper download started!");
  };

  if (!wallpaper) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/70" onClick={onClose}>
      <div
        className="relative bg-wallflix-dark-purple rounded-lg overflow-hidden w-full max-w-5xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-wallflix-dark-purple">
            <div className="w-10 h-10 border-4 border-wallflix-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="relative">
          <img
            src={wallpaper.urls.regular}
            alt={wallpaper.alt_description || wallpaper.description || "Wallpaper"}
            className="w-full max-h-[80vh] object-contain"
            onLoad={() => setIsLoading(false)}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{wallpaper.alt_description || wallpaper.description || "Untitled"}</h2>
                <p className="text-gray-300">by {wallpaper.user.name}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {wallpaper &&
                    Array.isArray((wallpaper as any).categories) &&
                    ((wallpaper as any).categories as string[]).map((cat) => (
                      <span key={cat} className="px-2 py-1 bg-black/30 text-xs rounded-full text-gray-200">
                        {cat}
                      </span>
                    ))}
                </div>
                <a
                  href={`https://unsplash.com/photos/${wallpaper.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs underline text-blue-300 block mt-2"
                >
                  View on Unsplash
                </a>
              </div>
              <Button
                onClick={handleDownload}
                className="bg-wallflix-purple hover:bg-wallflix-purple/80 text-white button-glow flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Wallpaper
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperModal;
