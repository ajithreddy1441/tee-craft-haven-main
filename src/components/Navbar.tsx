
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  ShoppingCart, 
  Search, 
  User, 
  Menu, 
  Sun, 
  Moon, 
  X
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be from auth context in a real app

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and brand name (Left) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">Sr</span>
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">ssr prints</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden p-2" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Search bar (Center - visible on desktop only) */}
          <div className="hidden md:flex w-full max-w-md mx-4">
            <div className="relative w-full">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pr-10 w-full" 
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Icons and buttons (Right - visible on desktop only) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/favorites" className="p-2 relative">
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="p-2 relative">
              <ShoppingCart size={24} />
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <Link to="/account" className="p-2">
                <User size={24} />
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">Login / Sign Up</Button>
              </Link>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu (full-screen overlay) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b z-50 animate-fade-in">
          <div className="container mx-auto p-4 flex flex-col space-y-4">
            <div className="relative w-full mb-2">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pr-10 w-full" 
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Search size={18} className="text-muted-foreground" />
              </div>
            </div>
            
            <div className="flex justify-between">
              <Link to="/favorites" className="flex items-center space-x-2 p-2" onClick={toggleMenu}>
                <Heart size={20} />
                <span>Favorites</span>
              </Link>
              <Link to="/cart" className="flex items-center space-x-2 p-2 relative" onClick={toggleMenu}>
                <ShoppingCart size={20} />
                <span>Cart</span>
                {totalCartItems > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </Link>
            </div>
            
            <div className="flex justify-between">
              {isLoggedIn ? (
                <Link to="/account" className="flex items-center space-x-2 p-2" onClick={toggleMenu}>
                  <User size={20} />
                  <span>My Account</span>
                </Link>
              ) : (
                <Link to="/login" className="w-full" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">Login / Sign Up</Button>
                </Link>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="ghost" 
                className="flex items-center space-x-2 w-full"
                onClick={() => {
                  toggleTheme();
                  toggleMenu();
                }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
