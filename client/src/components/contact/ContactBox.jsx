import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";
import { useToast } from "../ui/Use-Toast";
import { base_url } from "../../services/base_url";

const API_URL = `${base_url}/contact/addmessage`;

export default function ContactBox() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    section: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);

      toast.success({
        title: "Message Sent!",
        description: "Our team will contact you soon.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        section: "",
        message: "",
      });
    } catch (err) {
      toast.error({
        title: "Submission Failed",
        description: "Please try again later.",
      });
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-stretch">
        {/* Left: Contact Info */}
        <div className="bg-black rounded-2xl text-white p-8 shadow-lg h-full flex flex-col justify-between">
          <div>
            <span className="bg-teal-400 text-black font-semibold px-4 py-1 rounded-full text-sm mb-4 inline-block">
              Contact Us
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-teal-400">
              Need More Information? <br /> Get in Touch
            </h2>
            <p className="text-gray-200 mb-6">
              We're ready to help! Fill the form and our wellness team will reach out to you.
            </p>

            <div className="space-y-4 text-sm text-white">
              <div className="flex items-center gap-3">
                <Phone className="text-teal-400" size={20} />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-teal-400" size={20} />
                <p>hello@fitaura.com</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-teal-400 mt-1" size={20} />
                <p>Office: Bangalore, India</p>
              </div>
            </div>
          </div>
          <button className="mt-8 bg-teal-500 text-black font-semibold px-6 py-2 rounded-full hover:bg-teal-600 transition">
            Back to Home
          </button>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Send Message</h3>
          <p className="text-gray-600 mb-6 text-sm">
            Fill out the form below to send us a message and we’ll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full"
              required
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full md:col-span-2"
              required
            />
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full md:col-span-2 text-gray-600"
              required
            >
              <option value="">Select a section</option>
              <option value="nutrition">Nutrition</option>
              <option value="routine">Routine</option>
              <option value="moods">Moods</option>
              <option value="health">Health & Wellness</option>
              <option value="other">Other</option>
            </select>
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md w-full md:col-span-2"
              required
            />

            <button
              type="submit"
              className="bg-teal-500 text-black font-semibold py-3 rounded-md md:col-span-2 hover:bg-teal-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
