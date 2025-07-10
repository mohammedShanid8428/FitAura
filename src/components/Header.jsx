import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
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
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-teal-600">
          FitAura
        </Link>

        {/* Navigation */}
        <nav className="space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition duration-200 ${
                pathname === link.path
                  ? "text-teal-600 border-b-2 border-teal-500 pb-1"
                  : "text-gray-600 hover:text-teal-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
