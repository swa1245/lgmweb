// 'use client';

// import React, { useState } from 'react';
// import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebookF } from 'react-icons/fa';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Thank you for your message! We will get back to you soon.');
//     setFormData({
//       name: '',
//       email: '',
//       subject: '',
//       message: ''
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
//         <p className="text-gray-600">We'd love to hear from you. Drop us a line and we'll get back to you as soon as possible.</p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-12">
//         {/* Contact Form */}
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {['name', 'email', 'subject'].map((field) => (
//               <input
//                 key={field}
//                 type={field === 'email' ? 'email' : 'text'}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 required
//                 placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
//                 className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             ))}
//             <textarea
//               name="message"
//               rows="5"
//               value={formData.message}
//               onChange={handleChange}
//               required
//               placeholder="Your Message"
//               className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             ></textarea>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>

//         {/* Contact Info */}
//         <div className="space-y-6">
//           <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
//           <div className="space-y-4 text-gray-700">
//             <div className="flex items-start gap-4">
//               <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
//               <div>
//                 <h3 className="font-semibold">Our Location</h3>
//                 <p>Omkar Nandan Soc -A2-303, Near Navale Bridge, Pune-411041, Maharashtra, India</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <FaPhone className="text-blue-600 text-xl mt-1" />
//               <div>
//                 <h3 className="font-semibold">Phone Number</h3>
//                 <p>7744042929</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <FaEnvelope className="text-blue-600 text-xl mt-1" />
//               <div>
//                 <h3 className="font-semibold">Email Address</h3>
//                 <p>sportslgm@gmail.com</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-4">
//               <FaClock className="text-blue-600 text-xl mt-1" />
//               <div>
//                 <h3 className="font-semibold">Working Hours</h3>
//                 <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
//               </div>
//             </div>
//           </div>

//           {/* Social Media Links */}
//           <div className="flex gap-4 mt-6">
//             <a href="https://www.instagram.com/lgm.sports?igsh=MW5lOXQ2dGFjcmZ3cA==" target="_blank" rel="noreferrer" className="text-blue-600 text-xl hover:scale-110 transition">
//               <FaInstagram />
//             </a>
//             <a href="https://www.facebook.com/share/1AFW5ucGBg/" target="_blank" rel="noreferrer" className="text-blue-600 text-xl hover:scale-110 transition">
//               <FaFacebookF />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;

"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-12 ">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-lg">
            We'd love to hear from you. Drop us a line and we'll get back to you
            as soon as possible.
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Card */}
          <div className="bg-gray-50 p-8 shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white  text-gray-800"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white  text-gray-800"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white  text-gray-800"
              />
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">
              Contact Information
            </h2>
            <div className="space-y-5 text-gray-700">
              <div className="flex items-start gap-4 mt-8">
                <FaMapMarkerAlt className="text-blue-700 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900">Our Location</h3>
                  <p>
                    Omkar Nandan Soc -A2-303, Near Navale Bridge,
                    <br />
                    Vadgaon Budruk, Pune-411041, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mt-7">
                <FaPhone className="text-blue-700 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900">Phone Number</h3>
                  <p>7744042929</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mt-7">
                <FaEnvelope className="text-blue-700 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900">Email Address</h3>
                  <p>sportslgm@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mt-7">
                <FaClock className="text-blue-700 text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900">Working Hours</h3>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-5 mt-7">
              <a
                href="https://www.instagram.com/lgm.sports?igsh=MW5lOXQ2dGFjcmZ3cA=="
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 text-2xl hover:scale-110 transition"
              >
                <FaInstagram className="text-blue-700 text-2xl" />
              </a>
              <a
                href="https://www.facebook.com/share/1AFW5ucGBg/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 text-2xl hover:scale-110 transition"
              >
                <FaFacebookF className="text-blue-700 text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="text-black  py-6  ">
        <Footer />
      </footer>
    </div>
  );
};

export default ContactPage;
