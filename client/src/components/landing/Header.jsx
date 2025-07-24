import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";
import { motion } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="px-4 md:px-6 py-4 bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Left Nav */}
        <nav className="hidden md:flex space-x-8 text-lg font-bold text-gray-800">
          <Link to="/auth/register" className="hover:text-green-600 transition-colors">
            Dashboard
          </Link>
          <Link to="/auth/register" className="hover:text-green-600 transition-colors">
            About
          </Link>
          <Link to="/auth/register" className="hover:text-green-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Center Logo */}
        <div className="flex items-center space-x-2 md:text-3xl font-extrabold text-gray-800">
          <img 
            src={images.icon} 
            alt="FitAura Logo" 
            className="h-11 w-11"
          />
          <h1 className="text-gray-800 tracking-wider">FitAura</h1>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth/login">
            <Button variant="outline" className="text-black rounded-full border-gray-300 hover:border-gray-800">
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="default" className="rounded-[40px] bd-gray-800 shadow-md hover:shadow-lg">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Link to="/auth/login">
            <Button className="bg-gray-800 text-white rounded-[40px] text-[12px] px-2 py-[3px] hover:bg-gray-700">
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="outline" className="rounded-[40px] text-[12px] px-2 py-[2px] border-gray-800 hover:border-green-500">
              Register
            </Button>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-gray-700 ml-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3 text-sm font-medium text-gray-700 bg-white rounded-xl shadow-lg">
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-green-600 border-b border-gray-100">
            Dashboard
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-green-600 border-b border-gray-100">
            About
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-green-600">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}