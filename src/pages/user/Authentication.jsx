import React, { useState } from 'react';

const Authentication = () => {
  const [authState, setAuthState] = useState('login'); // 'login' or 'register'
  const isLogin = authState === 'login';

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-[#121212] text-white p-8 rounded-2xl shadow-2xl border border-gray-800 transition-all duration-300">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <p className="text-center text-gray-400 text-sm mb-8">
          {isLogin ? 'Access your account' : 'Create a new account'}
        </p>

        {/* Form */}
        <form className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder=" "
                required
                className="peer w-full bg-transparent border-b-2 border-gray-600 px-2 pt-5 pb-2 text-sm focus:outline-none focus:border-pink-500"
              />
              <label className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-pink-400">
                Username
              </label>
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder=" "
              required
              className="peer w-full bg-transparent border-b-2 border-gray-600 px-2 pt-5 pb-2 text-sm focus:outline-none focus:border-cyan-500"
            />
            <label className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400">
              Email Address
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder=" "
              required
              className="peer w-full bg-transparent border-b-2 border-gray-600 px-2 pt-5 pb-2 text-sm focus:outline-none focus:border-cyan-500"
            />
            <label className="absolute left-2 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-cyan-400">
              Password
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className={`w-full ${
              isLogin ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-pink-500 hover:bg-pink-600'
            } transition text-white font-medium py-2 rounded-xl mt-4`}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          {/* Toggle link */}
          <p className="text-center text-sm text-gray-400 mt-4">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => setAuthState(isLogin ? 'register' : 'login')}
              className={`ml-1 underline ${
                isLogin ? 'text-pink-400' : 'text-cyan-400'
              } hover:opacity-80`}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
