
import React from "react";
import { categories } from "@/data/wallpapers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const Hero: React.FC<HeroProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Hero Content */}
      <div className="z-10 text-center px-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-glow tracking-tight">
          Wallify
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Stunning royalty-free images & royalty-free stock
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto mt-8">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300",
                selectedCategory === category
                  ? "bg-wallflix-purple text-white hover:bg-wallflix-purple/80"
                  : "bg-black/40 hover:bg-black/60 text-white border border-white/10"
              )}
              variant="ghost"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-70"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

