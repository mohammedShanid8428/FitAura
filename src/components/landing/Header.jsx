import React, {useState} from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button"; 
import { Link } from "react-router-dom";
import { images } from "../../assets/images";

export default function Header(){
  const [mobileMenuOpen,setMobileMenuOpen]=useState(false);

  return(
    <header className="px-4 md:p-6 py-4 bg-gray-50  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <nav className="hidden md:flex space-x-8 text-lg font-medium text-gray-800">
          <Link to="/dashboard" className="hover:text-green-700 hover:font-bold transition">Dashboard</Link>
          <Link to="/about" className="hover:text-green-700 hover:font-bold transition">About</Link>
          <Link to="/contact" className="hover:text-green-700 hover:font-bold transition">Contact</Link>
        </nav>

        <div className="flex items-center space-x-2 md:text-3xl  font-extrabold text-gray-800">
          <img src={images.icon} alt="FitAura Logo" className="h-11 w-11" />
          <h1 className="text-gray-800 tracking-wider">FitAura</h1>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/contact" className="hover:text-green-700 hover:font-bold transition">Discover</Link>
          <Link to="/auth/login">
            <Button variant="outline" className=" text-gray-800 rounded-full">Login</Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="default" className="rounded-[40px]">Register</Button>
          </Link>
        </div>

        {/* mobile responsive */}

        <div className="md:hidden flex items-center space-x-2">
          <Link to="/auth/login">
            <Button className="bg-black text-white rounded-[40px] text-[12px] px-1 py-[3px]">
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="outline" className="rounded-[40px] text-[12px] px-1 py-[2px]">
              Register
            </Button>
          </Link>

          <button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 ml-2">
            {mobileMenuOpen? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen &&(
        <div className="md:hidden mt-4 px-4 space-y-3 text-sm font-medium text-gray-700 animate-slide-down">
           <Link to="/" className="block">Dashboard</Link>
          <Link to="/contact" className="block">Contact</Link>
          <Link to="/about" className="block">About</Link>
          <Link to="/discover" className="block">Discover</Link>
        </div>
      )}
    </header>
  )
}