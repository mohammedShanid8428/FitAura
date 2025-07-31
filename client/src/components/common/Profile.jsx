import React, { useState, useEffect, useRef } from "react";
import { User, Mail, Camera, Upload, Settings, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/ui/Use-Toast";
import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser, getToken } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
  });

  // Initialize form data with user info
  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        email: user.email || ""
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error({
        title: "Invalid File Type",
        description: "Please select a valid image file (JPEG, PNG, or GIF).",
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error({
        title: "File Too Large",
        description: "Image size should be less than 5MB.",
      });
      return;
    }

    setImageLoading(true);

    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const token = getToken();
      const response = await axios.post(
        `${API_URL}/upload-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        // Update context with new profile image
        updateUser({
          ...user,
          profileImage: response.data.profileImage
        });

        toast.success({
          title: "Image Uploaded",
          description: "Profile image updated successfully!",
        });
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to upload image.";
      toast.error({
        title: "Upload Failed",
        description: errorMessage,
      });
    } finally {
      setImageLoading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!profileData.username.trim() || !profileData.email.trim()) {
      toast.error({
        title: "Missing Fields",
        description: "Username and email are required.",
      });
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      toast.error({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const token = getToken();
      const response = await axios.put(
        `${API_URL}/profile`,
        {
          username: profileData.username,
          email: profileData.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        // Update context with new data
        updateUser({
          ...user,
          username: profileData.username,
          email: profileData.email
        });

        toast.success({
          title: "Profile Updated",
          description: "Your profile has been updated successfully!",
        });
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to update profile.";
      toast.error({
        title: "Update Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProfileImageUrl = () => {
    if (user?.profileImage) {
      return `http://localhost:3000/${user.profileImage}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-200 hover:text-gray-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Profile Card */}
          <div className="bg-gray-200 rounded-2xl shadow-lg border border-gray-400 p-6 lg:col-span-1">
            <div className="flex flex-col items-center">
              {/* Profile Avatar */}
              <div className="relative mb-4">
                <div 
                  className="w-32 h-32 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-4xl cursor-pointer overflow-hidden relative"
                  onClick={handleImageClick}
                >
                  {getProfileImageUrl() ? (
                    <img
                      src={getProfileImageUrl()}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.username?.charAt(0).toUpperCase() || "U"
                  )}
                  {imageLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Camera className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                  </div>
                </div>
                
                <button 
                  onClick={handleImageClick}
                  className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
                  disabled={imageLoading}
                >
                  <Camera size={18} />
                </button>
                
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <h2 className="text-xl font-bold text-gray-800">{user?.username || "User"}</h2>
              <p className="text-gray-800 mb-6">{user?.email || "user@example.com"}</p>
              
              <div className="w-full bg-gray-100 rounded-xl p-4">
                <h3 className="font-medium text-gray-800 mb-2">Account Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-800">User ID:</span>
                    <span className="font-medium text-gray-800">{user?.userId?.slice(0, 8) || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Account Type:</span>
                    <span className="font-medium text-gray-800 capitalize">{user?.role || "User"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Profile Image:</span>
                    <span className="font-medium text-gray-800">
                      {user?.profileImage ? "Uploaded" : "Not set"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 w-full">
                <div className="flex items-center space-x-3 text-gray-680 p-3 bg-gray-50 rounded-lg">
                  <Upload className="w-5 h-5" />
                  <p className="text-sm">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Form Section */}
          <div className="bg-gray-200 rounded-2xl shadow-lg border border-gray-400 p-6 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <Settings className="w-6 h-6 text-lime-500" />
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            </div>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-800">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 disabled:opacity-70 text-white font-medium py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <Save size={18} />
                      <span className="font-semibold">Update Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-blue-800">Password Management</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      For security reasons, password changes are handled separately. Contact support if you need to reset your password.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;