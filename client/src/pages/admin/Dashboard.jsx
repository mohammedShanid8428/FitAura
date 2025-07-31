// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Home, 
  MessageSquare, 
  Heart, 
  Utensils, 
  Dumbbell, 
  Menu, 
  X, 
  Users, 
  TrendingUp, 
  Bell,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  ChevronDown,
  Activity,
  Mail,
  Settings
} from 'lucide-react';
import NutritionManager from './NutritionManager';
import RoutinesManager from './RoutinesManager';
import MoodMonitor from './MoodMonitor';
import HydrationDash from '../../components/dashboard/HydrationDash';

// Base URL configuration
const base_url = "http://localhost:3000"; // Update with your actual base URL
const API_URL = `${base_url}/api/contact/messages`;

// Mock data for demonstration (only used where real data not available)
const mockStats = {
  totalUsers: 1247,
  totalMessages: 89,
  totalMeals: 156,
  totalRoutines: 73,
  totalMoods: 234,
  newUsersToday: 12,
  messagesUnread: 15,
  activeUsers: 89,
  hydrationRate: 78
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [replyTo, setReplyTo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'messages', name: 'Messages', icon: MessageSquare, badge: mockStats.messagesUnread },
    { id: 'moods', name: 'Mood Monitor', icon: Heart },
    { id: 'nutrition', name: 'Nutrition', icon: Utensils },
    { id: 'routines', name: 'Routines', icon: Dumbbell },
    { id: 'hydration', name: 'Hydration', icon: Activity },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Fetch real contact messages
  const fetchMessages = async () => {
    setMessagesLoading(true);
    try {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setMessagesLoading(false);
    }
  };

  // Delete message
  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMessages(); // Refresh messages
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Load messages when messages tab becomes active
  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const handleReply = (message) => {
    setReplyTo(message);
  };

  // Components with updated color theme (lime-400, white, black, gray-400)
  const StatCard = ({ icon: Icon, title, value, change, changeType = 'positive' }) => (
    <div className="bg-gradient-to-br from-white/90 to-gray-50 rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-lime-400 to-lime-500 rounded-lg">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className="h-4 w-4" />
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );

  const MessageCard = ({ message, onReply, onDelete }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-lime-400 to-lime-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {message.firstName?.[0] || 'F'}{message.lastName?.[0] || 'A'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {message.firstName || 'User'} {message.lastName || ''}
            </h3>
            <p className="text-sm text-gray-500">{message.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">
            {new Date(message.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Section: {message.section}</p>
        <p className="text-gray-600">{message.message}</p>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onReply(message)}
          className="flex-1 bg-lime-400 hover:bg-lime-500 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Mail className="h-4 w-4" />
          <span>Reply</span>
        </button>
        <button
          onClick={() => onDelete(message._id)}
          className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Users}
                title="Total Users"
                value={mockStats.totalUsers.toLocaleString()}
                change="+12 today"
              />
              <StatCard
                icon={MessageSquare}
                title="Messages"
                value={mockStats.totalMessages}
                change={`${mockStats.messagesUnread} unread`}
                changeType="negative"
              />
              <StatCard
                icon={Utensils}
                title="Meals"
                value={mockStats.totalMeals}
                change="+5 this week"
              />
              <StatCard
                icon={Dumbbell}
                title="Routines"
                value={mockStats.totalRoutines}
                change="+3 this week"
              />
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Contact Messages ({messages.length})
              </h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {messagesLoading ? (
              <p className="text-center text-gray-500 py-10">Loading messages...</p>
            ) : messages.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No messages found.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {messages.map(message => (
                  <MessageCard
                    key={message._id}
                    message={message}
                    onReply={handleReply}
                    onDelete={handleDeleteMessage}
                  />
                ))}
              </div>
            )}

            {/* Reply Modal */}
            {replyTo && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Reply to {replyTo.email}
                    </h3>
                    <button
                      onClick={() => setReplyTo(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <textarea
                    rows="6"
                    placeholder="Type your reply..."
                    className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                  ></textarea>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setReplyTo(null)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        console.log(`Send reply to: ${replyTo.email}`);
                        setReplyTo(null);
                      }}
                      className="px-4 py-2 bg-lime-400 text-black rounded-lg hover:bg-lime-500 transition-colors"
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'nutrition':
        return <NutritionManager />;

      case 'routines':
        return <RoutinesManager />;

      case 'moods':
        return <MoodMonitor />;

      case 'hydration':
        return <HydrationDash />;

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications for new messages</p>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-lime-400 transition-colors">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-22'} bg-gradient-to-b from-lime-600 to-lime-700 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-lime-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-lime-600 font-bold text-xl">F</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-white">FitAura</h1>
                <p className="text-xs text-lime-200">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-gradient-to-r from-lime-400 to-lime-500 text-black shadow-lg' 
                        : 'text-lime-200 hover:bg-lime-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {sidebarOpen && (
                      <>
                        <span className="font-medium">{item.name}</span>
                        {item.badge && (
                          <span className={`ml-auto px-2 py-1 text-xs rounded-full ${
                            isActive 
                              ? 'bg-black/10 text-black' 
                              : 'bg-red-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-lime-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-lime-400 to-lime-500 rounded-full flex items-center justify-center">
              <span className="text-black font-semibold text-sm">AD</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">shan</p>
                <p className="text-xs text-lime-200 truncate">shan@gmail.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab}
                </h1>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Quick Actions */}
              <div className="relative">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-lime-400 to-lime-500 text-black rounded-lg hover:shadow-lg transition-all">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Quick Add</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}