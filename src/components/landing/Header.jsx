import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="px-4 md:px-6 py-4 bg-gray-50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Left Nav */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-800">
          <Link to="/dashboard" className="hover:text-green-700 hover:font-bold transition">
            Dashboard
          </Link>
          <Link to="/about" className="hover:text-green-700 hover:font-bold transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-green-700 hover:font-bold transition">
            Contact
          </Link>
        </nav>

        {/* Center Logo */}
        <div className="flex items-center space-x-2 md:text-3xl font-extrabold text-gray-800">
          <img src={images.icon} alt="FitAura Logo" className="h-11 w-11" />
          <h1 className="text-gray-800 tracking-wider">FitAura</h1>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth/login">
            <Button variant="outline" className="text-gray-800 rounded-full">
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="default" className="rounded-[40px]">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Link to="/auth/login">
            <Button className="bg-black text-white rounded-[40px] text-[12px] px-2 py-[3px]">
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="outline" className="rounded-[40px] text-[12px] px-2 py-[2px]">
              Register
            </Button>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 ml-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3 text-sm font-medium text-gray-700 bg-white rounded-xl shadow animate-slide-down">
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-green-700">
            Dashboard
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-green-700">
            About
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-green-700">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
