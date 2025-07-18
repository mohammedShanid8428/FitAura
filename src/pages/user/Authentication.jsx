import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Lock, User, Mail } from "lucide-react";
import { images } from "../../assets/images";
import { Link } from "react-router-dom";

const Authentication = () => {
  const location = useLocation();
  const isRegisterRoute = location.pathname.includes("register");

  const [authState, setAuthState] = useState(isRegisterRoute ? "register" : "login");
  const isLogin = authState === "login";

  // Sync state when route changes
  useEffect(() => {
    setAuthState(isRegisterRoute ? "register" : "login");
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${images.modal20})`,
      }}
    >
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl px-8 py-10 border border-orange-100">
        <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-2">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          {isLogin
            ? "Log in to continue your wellness journey"
            : "Join us and start your journey to better health!"}
        </p>

        <form className="space-y-4">
          {!isLogin && (
            <div className="flex items-center bg-[#FFF5E8] border border-orange-200 rounded-xl px-4 py-3">
              <User className="w-4 h-4 mr-2 text-orange-400" />
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent w-full outline-none text-sm placeholder:text-orange-300"
                required
              />
            </div>
          )}

          <div className="flex items-center bg-[#FFF5E8] border border-orange-200 rounded-xl px-4 py-3">
            <Mail className="w-4 h-4 mr-2 text-orange-400" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full outline-none text-sm placeholder:text-orange-300"
              required
            />
          </div>

          <div className="flex items-center bg-[#FFF5E8] border border-orange-200 rounded-xl px-4 py-3">
            <Lock className="w-4 h-4 mr-2 text-orange-400" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full outline-none text-sm placeholder:text-orange-300"
              required
            />
          </div>

          <Link to="/dashboard" className="block">
            <button
              type="button"
              className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition"
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>
          </Link>

          {isLogin && (
            <p className="text-center text-sm text-orange-400 hover:underline cursor-pointer mt-2">
              Forgot Password? Click Here
            </p>
          )}

          <Link
            to={isLogin ? "/auth/register" : "/auth/login"}
            className="block"
          >
            <button
              type="button"
              className="w-full bg-gradient-to-r from-pink-400 to-orange-300 hover:to-pink-500 text-white font-bold py-3 rounded-xl mt-4 transition"
            >
              {isLogin ? "REGISTER" : "BACK TO LOGIN"}
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
