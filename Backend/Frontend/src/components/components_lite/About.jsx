import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

const AboutUs = () => {
  const sections = [
    {
      img: "logos/logo.png",
      text: "Welcome to Job-Z, where we connect talented individuals with their dream jobs. Our mission is to simplify the job search process and help employers find the best candidates.",
      reverse: false,
    },
    {
      img: "/1.png",
      text: "Our platform is built with advanced technologies to ensure a seamless experience for both job seekers and employers. We believe in creating opportunities and empowering careers.",
      reverse: true,
    },
    {
      img: "/2.png",
      text: "With a team of dedicated professionals, we aim to provide personalized job recommendations and career guidance to help you achieve your goals.",
      reverse: false,
    },
    {
      img: "/4.png",
      text: "Join us in our journey to bridge the gap between talent and opportunity, making the hiring process transparent, efficient, and effective.",
      reverse: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-center text-3xl font-bold text-black mb-10">About Us</h1>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ x: section.reverse ? "100vw" : "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, duration: 1 }}
            className={`flex flex-col md:flex-row ${section.reverse ? "md:flex-row-reverse" : ""} items-center gap-10 mb-10 p-6 shadow-lg hover:shadow-xl bg-transparent max-w-4xl mx-auto border border-black`}
            >
            <img
              src={section.img}
              alt="About Us"
              className="w-64 h-64 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="text-lg font-semibold text-black max-w-lg">{section.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
