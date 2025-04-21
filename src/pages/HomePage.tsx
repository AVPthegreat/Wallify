
import React, { useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WallpaperGrid from "@/components/WallpaperGrid";
import WallpaperModal from "@/components/WallpaperModal";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import { useUnsplashWallpapers, categories, setUnsplashAccessKey } from "@/hooks/useUnsplashWallpapers";

// Number of wallpapers per page
const WALLPAPERS_PER_PAGE = 12;

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWallpaper, setSelectedWallpaper] = useState<any | null>(null);

  const { images, total, loading, error } = useUnsplashWallpapers({
    category: selectedCategory,
    query: searchQuery,
    page: currentPage,
    perPage: WALLPAPERS_PER_PAGE,
  });

  const totalPages = Math.max(1, Math.ceil(total / WALLPAPERS_PER_PAGE));

  // Show prompt if key is not set
  if (error && error.includes("API key")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h2 className="text-2xl font-bold mb-4">Unsplash API Key Required</h2>
        <p className="mb-4">Get a (free) API access key at <a href="https://unsplash.com/developers" target="_blank" className="underline text-blue-400">unsplash.com/developers</a>.<br/>Paste it below and click Save.</p>
        <input
          className="p-2 text-black rounded mb-2"
          placeholder="Enter Unsplash Access Key"
          type="text"
          autoFocus
          onKeyDown={e => {
            if (e.key === "Enter") setUnsplashAccessKey((e.target as HTMLInputElement).value)
          }}
        />
        <button
          className="bg-wallflix-purple text-white px-4 py-2 rounded"
          onClick={() => {
            const el = document.querySelector('input[placeholder="Enter Unsplash Access Key"]') as HTMLInputElement;
            if (el && el.value) setUnsplashAccessKey(el.value);
          }}
        >
          Save
        </button>
      </div>
    );
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to grid
    const gridElement = document.getElementById("wallpaper-grid");
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWallpaperClick = (wallpaper: any) => {
    setSelectedWallpaper(wallpaper);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedWallpaper(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Hero selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
      <div id="wallpaper-grid">
        <WallpaperGrid
          wallpapers={images}
          isLoading={loading}
          error={error}
          onWallpaperClick={handleWallpaperClick}
        />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
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

export default HomePage;
