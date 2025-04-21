
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar onSearch={() => {}} />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md animate-fade-in">
          <h1 className="text-7xl font-bold text-wallflix-purple mb-4">404</h1>
          <p className="text-2xl text-white mb-6">Oops! Page not found</p>
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button asChild className="bg-wallflix-purple hover:bg-wallflix-purple/80 text-white button-glow">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
