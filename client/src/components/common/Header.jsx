import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../assets/images";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Mood", path: "/mood" },
    { name: "Nutrition", path: "/nutrition" },
    { name: "Routines", path: "/routines" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-gray-400 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b px-4 md:px-10 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
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

        {/* Right: Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 pb-4 space-y-4 font-medium text-lg text-gray-700 bg-white rounded-xl shadow animate-slide-down">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 px-2 rounded hover:bg-gray-100 ${
                pathname === link.path ? "text-white font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
