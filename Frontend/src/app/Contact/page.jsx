
"use client";

import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaPaperPlane,
  FaMapMarkedAlt
} from "react-icons/fa";
import Link from "next/link";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 py-12">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-blue-100 text-base max-w-xl mx-auto">
            We're here to help with any questions about our products or services
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Send us a Message</h2>
            
            {submitSuccess && (
              <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4 rounded-md">
                <p className="text-green-700 text-sm">Thank you! We'll respond to your message soon.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-3 py-2 border text-gray-700 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-3 py-2 border text-gray-700 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full px-3 py-2 border text-gray-700 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={4}
                  required
                  className="w-full px-3 py-2 border text-gray-700 border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FaPaperPlane className="ml-2 text-sm" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3 flex-shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Our Location</h3>
                    <p className="text-gray-600 text-sm">
                      Omkar Nandan Soc -A2-303, Near Navale Bridge,
                      Vadgaon Budruk, Pune-411041, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3 flex-shrink-0">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm">+91 7744042929</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3 flex-shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">sportslgm@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3 flex-shrink-0">
                    <FaClock />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Hours</h3>
                    <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3">Connect With Us</h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/lgm.sports?igsh=MW5lOXQ2dGFjcmZ3cA=="
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-700 text-blue-600 p-2 rounded-full hover:bg-orange-500 transition-all"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1AFW5ucGBg/"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-700 text-blue-600 p-2 rounded-full hover:bg-orange-500 transition-all"
                  >
                    <FaFacebookF />
                  </a>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Find Us On The Map</h2>
          <div className="rounded-md overflow-hidden h-64 md:h-80 border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5761897254896!2d73.81543491489459!3d18.45789638744538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295236344a3c7%3A0xb60af5b0fe7a3d4c!2sNavale%20Bridge%2C%20Narhe%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1629789892777!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="LGM Sports Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
