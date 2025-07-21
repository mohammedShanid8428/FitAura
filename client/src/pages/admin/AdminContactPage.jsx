import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/contact/messages";

export default function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState(null); // Track message to reply

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Messages</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.map(msg => (
            <div
              key={msg._id}
              className="bg-white border border-gray-200 rounded-2xl shadow p-6 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold text-teal-600 mb-2">Message from {msg.firstName} {msg.lastName}</h3>

              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Section:</strong> {msg.section}</p>
                <p><strong>Message:</strong> {msg.message}</p>
                <p className="text-gray-500 text-xs">Submitted: {new Date(msg.createdAt).toLocaleString()}</p>
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setReplyTo(msg)}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded-xl transition"
                >
                  Reply
                </button>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Simple Reply Modal */}
      {replyTo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-teal-600">Reply to {replyTo.email}</h3>
            <textarea
              rows="6"
              placeholder="Type your reply..."
              className="w-full border border-gray-300 p-3 rounded-lg mb-4"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setReplyTo(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`send reply to: ${replyTo.email}`);
                  setReplyTo(null);
                }}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
