import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock, User, Mail } from "lucide-react";
import { images } from "../../assets/images";
import { useToast } from "../../components/ui/Use-Toast";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';

const API_URL = "http://localhost:3000/api/users";

const Authentication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth(); // Use the login function from context

  const isRegisterRoute = location.pathname.includes("register");
  const [authState, setAuthState] = useState(isRegisterRoute ? "register" : "login");
  const isLogin = authState === "login";
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({ 
    email: "", 
    username: "", 
    password: "" 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Enhanced validation
    if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
      toast.error({
        title: "Missing Fields",
        description: "Please fill all required fields.",
      });
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      setIsLoading(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      toast.error({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password
        });

        if (res.status === 200) {
          toast.success({
            title: "Login Success",
            description: `Welcome back, ${res.data.username}!`,
          });

          // Use the login function from AuthContext
          const loginSuccess = login(res.data);
          
          if (loginSuccess) {
            // Navigate based on role
            if (res.data.role === "admin") {
              navigate("/admin");
            } else {
              navigate("/dashboard");
            }
          }
        }
      } else {
        const res = await axios.post(`${API_URL}/register`, formData);
        
        if (res.status === 201) {
          toast.success({
            title: "Registration Success",
            description: "Account created successfully! Please login.",
          });
          
          // Clear form and redirect to login
          setFormData({ email: "", username: "", password: "" });
          navigate("/auth/login");
        }
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Something went wrong.";
      toast.error({
        title: isLogin ? "Login Failed" : "Registration Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAuthState(isRegisterRoute ? "register" : "login");
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${images.modal20})` }}
    >
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl px-8 py-10 border border-orange-100">
        <h2 className="text-2xl font-extrabold text-gray-800 text-center mb-2">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          {isLogin ? "Log in to continue your wellness journey" : "Join us and start your journey to better health!"}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex items-center bg-[#FFF5E8] border border-orange-300 rounded-xl px-4 py-3">
              <User className="w-4 h-4 mr-2 text-gray-800" />
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-transparent w-full outline-none text-sm placeholder:text-gray-800"
                disabled={isLoading}
                required={!isLogin}
              />
            </div>
          )}

          <div className="flex items-center bg-[#FFF5E8] border border-orange-300 rounded-xl px-4 py-3">
            <Mail className="w-4 h-4 mr-2 text-gray-800" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-transparent w-full outline-none text-sm placeholder:text-gray-800"
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex items-center bg-[#FFF5E8] border border-orange-300 rounded-xl px-4 py-3">
            <Lock className="w-4 h-4 mr-2 text-gray-800" />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-transparent w-full outline-none text-sm placeholder:text-gray-800"
              disabled={isLoading}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-400 hover:bg-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
          >
            {isLoading ? "Please wait..." : (isLogin ? "LOGIN" : "REGISTER")}
          </button>

          <Link to={isLogin ? "/auth/register" : "/auth/login"}>
            <button
              type="button"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-400 to-orange-300 hover:to-pink-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl mt-4 transition"
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