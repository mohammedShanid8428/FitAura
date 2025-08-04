import React, { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../assets/images";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Mood", path: "/mood" },
    { name: "Nutrition", path: "/nutrition" },
    { name: "Routines", path: "/routines" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  return (
    <header className="bg-gray-400 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b px-4 md:px-10 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img src={images.icon} alt="FitAura" className="h-12 w-12" />
          <span className="text-3xl font-extrabold text-gray-800 tracking-wider">
            FitAura
          </span>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-10 font-semibold text-[18px] text-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-white transition ${
                pathname === link.path
                  ? "text-white border-b-2 border-white pb-1"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: User Profile & Mobile Menu */}
        <div className="flex items-center space-x-4">
          
          {/* User Profile Dropdown (Desktop) */}
          {isAuthenticated && (
            <div className="hidden md:block relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-gray-800 font-medium">
                  {user?.username || "User"}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-700 transition-transform ${
                    profileDropdownOpen ? "rotate-180" : ""
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fade-in">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user?.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {user?.username || "User"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {user?.email || "user@example.com"}
                        </p>
                        <p className="text-xs text-orange-600 capitalize">
                          {user?.role || "user"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings size={18} />
                      <span>Edit Profile</span>
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 pb-4 bg-white rounded-xl shadow animate-slide-down">
          
          {/* Mobile User Info (if authenticated) */}
          {isAuthenticated && (
            <div className="py-4 border-b border-gray-200 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {user?.username || "User"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {user?.email || "user@example.com"}
                  </p>
                  <p className="text-xs text-orange-600 capitalize">
                    {user?.role || "user"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-2 font-medium text-lg text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-2 rounded hover:bg-gray-100 ${
                  pathname === link.path ? "text-orange-600 font-semibold bg-orange-50" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile User Actions */}
          {isAuthenticated && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 py-2 px-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                <Settings size={18} />
                <span>Edit Profile</span>
              </Link>
              
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 py-2 px-2 text-red-600 hover:bg-red-50 rounded w-full text-left"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;