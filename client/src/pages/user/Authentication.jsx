import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Lock, User, Mail } from "lucide-react";
import { images } from "../../assets/images";
import { useToast } from "../../components/ui/Use-Toast";
import axios from "axios";
import { authContext } from "../../../context/AuthContext";

const API_URL = "http://localhost:3000/api/users";

const Authentication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setAuthStatus } = useContext(authContext);

  const isRegisterRoute = location.pathname.includes("register");
  const [authState, setAuthState] = useState(isRegisterRoute ? "register" : "login");
  const isLogin = authState === "login";

  const [formData, setFormData] = useState({ email: "", username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
      toast.error({
        title: "Missing Fields",
        description: "Please fill all required fields.",
      });
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/login`, formData);

        if (res.status === 200) {
          toast.success({
            title: "Login Success",
            description: "Welcome back!",
          });
          setAuthStatus(true);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("username", res.data.username);
          navigate("/dashboard");
        }
      } else {
        const res = await axios.post(`${API_URL}/register`, formData);

        if (res.status === 201) {
          toast.success({
            title: "Registration Success",
            description: "Account created successfully!",
          });
          navigate("/auth/login");
        }
      }
    } catch (err) {
      toast.error({
        title: "Error",
        description: err?.response?.data?.message || "Something went wrong.",
      });
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
            <div className="flex items-center bg-[#FFF5E8] border border-orange-200 rounded-xl px-4 py-3">
              <User className="w-4 h-4 mr-2 text-orange-400" />
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-transparent w-full outline-none text-sm placeholder:text-orange-300"
              />
            </div>
          )}

          <div className="flex items-center bg-[#FFF5E8] border border-orange-200 rounded-xl px-4 py-3">
            <Mail className="w-4 h-4 mr-2 text-orange-400" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-transparent w-full outline-none text-sm placeholder:text-orange-300"
            />
          </div>

          <div className="flex items-center bg-[#FFF5E8] border border-orange-200 rounded-xl px-4 py-3">
            <Lock className="w-4 h-4 mr-2 text-orange-400" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-transparent w-full outline-none text-sm placeholder:text-orange-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition"
          >
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>

          <Link to={isLogin ? "/auth/register" : "/auth/login"}>
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
