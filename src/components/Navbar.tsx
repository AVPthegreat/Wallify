
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, Star, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  // Responsive nav links
  const navLinks = (
    <>
      <form onSubmit={handleSearch} className="relative hidden md:block">
        <Input
          type="text"
          placeholder="Search wallpapers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-black/30 border-wallflix-purple/30 focus-visible:ring-wallflix-purple w-64 text-sm"
        />
      </form>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-wallflix-purple"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>GitHub</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );

  // Mobile menu
  return (
    <nav
      className={cn(
        "w-full py-4 px-6 fixed top-0 left-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white text-glow flex items-center">Wallify</Link>
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileMenuOpen(v => !v)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {navLinks}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-sm flex flex-col">
          <div className="flex justify-between items-center px-5 py-4">
            <span className="text-2xl font-bold text-white">Wallify</span>
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileMenuOpen(false)}>
              ×
            </Button>
          </div>
          <div className="flex flex-col px-6 gap-3">
            <form onSubmit={handleSearch} className="w-full mb-2">
              <Input
                type="text"
                placeholder="Search wallpapers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/30 border-wallflix-purple/30 focus-visible:ring-wallflix-purple text-white"
              />
            </form>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 text-white"
            >
              <Github className="h-5 w-5" /> GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

