
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-brand-blue">BlissStay</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="block md:hidden" 
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-brand-blue transition-colors">
            Trang chủ
          </Link>
          <Link to="/search" className="text-sm font-medium hover:text-brand-blue transition-colors">
            Tìm kiếm
          </Link>
          <Link to="/booking" className="text-sm font-medium hover:text-brand-blue transition-colors">
            Đặt phòng
          </Link>
          <Link to="/reviews" className="text-sm font-medium hover:text-brand-blue transition-colors">
            Đánh giá
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-brand-blue transition-colors">
            Liên hệ
          </Link>
        </nav>
        
        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Đăng nhập</Link>
          </Button>
          <Button size="sm" className="bg-brand-blue hover:bg-brand-blue/90" asChild>
            <Link to="/register">Đăng ký</Link>
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-white z-50 flex flex-col md:hidden animate-fade-in">
            <nav className="flex flex-col gap-4 p-6">
              <Link 
                to="/" 
                className="text-lg font-medium py-2 hover:text-brand-blue transition-colors"
                onClick={toggleMenu}
              >
                Trang chủ
              </Link>
              <Link 
                to="/search" 
                className="text-lg font-medium py-2 hover:text-brand-blue transition-colors"
                onClick={toggleMenu}
              >
                Tìm kiếm
              </Link>
              <Link 
                to="/booking" 
                className="text-lg font-medium py-2 hover:text-brand-blue transition-colors"
                onClick={toggleMenu}
              >
                Đặt phòng
              </Link>
              <Link 
                to="/reviews" 
                className="text-lg font-medium py-2 hover:text-brand-blue transition-colors"
                onClick={toggleMenu}
              >
                Đánh giá
              </Link>
              <Link 
                to="/contact" 
                className="text-lg font-medium py-2 hover:text-brand-blue transition-colors"
                onClick={toggleMenu}
              >
                Liên hệ
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/login" onClick={toggleMenu}>Đăng nhập</Link>
                </Button>
                <Button size="lg" className="w-full bg-brand-blue hover:bg-brand-blue/90" asChild>
                  <Link to="/register" onClick={toggleMenu}>Đăng ký</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
