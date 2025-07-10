import React, { useState } from "react";
import { Lock, User, Mail} from "lucide-react";
import { images } from "../../assets/images"; 
import { Link } from "react-router-dom";

const Authentication = () => {
  const [authState, setAuthState] = useState("login");
  const isLogin = authState === "login";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(${images.modal13})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-gradient-to-b from-teal-400/25 to-black/50 backdrop-blur-md text-white px-8 py-10 rounded-2xl shadow-[0_0_40px_rgba(0,255,255,0.2)] border border-teal-300/60">
        <h2 className="text-2xl font-semibold text-center text-white tracking-wide mb-2">
          {isLogin ? "LOGIN" : "REGISTER"}
        </h2>

        <p className="text-center text-gray-400 text-sm mb-6">
          {isLogin ? "Access your account" : "Create a new account"}
        </p>

        <form className="space-y-6 mt-4">
          {!isLogin && (
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2">
              <User className="w-4 h-4 mr-2 text-white/70" />
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent w-full outline-none text-sm placeholder:text-white/50"
                required
              />
            </div>
          )}

          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2">
            <Mail className="w-4 h-4 mr-2 text-white/70" />
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full outline-none text-sm placeholder:text-white/50"
              required
            />
          </div>

          <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2">
            <Lock className="w-4 h-4 mr-2 text-white/70" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full outline-none text-sm placeholder:text-white/50"
              required
            />
          </div>

          <Link to="/dash" className="block">
            <button
              type="button" 
              className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-100 transition"
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>
          </Link>

          {isLogin && (
            <p className="text-center text-xs text-white/70 hover:underline cursor-pointer mt-2">
              Forgot Password? Click Here
            </p>
          )}

          <button
            type="button"
            onClick={() => setAuthState(isLogin ? "register" : "login")}
            className="w-full bg-gradient-to-r from-cyan-500 to-teal-400 hover:to-cyan-600 text-white font-bold py-2 rounded-md mt-4 transition"
          >
            {isLogin ? "REGISTER" : "BACK TO LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
