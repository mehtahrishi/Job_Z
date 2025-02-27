import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  const form = useRef();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_9z7xvth",
        "template_5i8m24p",
        form.current,
        "v8a5P8WjS63NHtMN9"
      );

      toast.success("Message sent successfully!");
      form.current.reset();
      setMessage("✅ Message sent successfully!");
    } catch (error) {
      toast.error("❌ Failed to send message! Try again.");
      setMessage("❌ Failed to send message! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center">
      <Navbar />

      {/* Parent Div for Centering */}
      <div className="max-w-7xl mx-auto my-10 flex items-center justify-center h-[70vh]">
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ x: "-100vw", opacity: 0 }} // Start from Left with Fade
          animate={{ x: 0, opacity: 1 }} // Stop in Center
          transition={{ type: "spring", stiffness: 80, duration: 1 }} // Smooth Bounce
          className="p-8 max-w-lg w-full border border-black shadow-lg hover:shadow-xl hover:shadow-[#fa4f09] rounded-lg bg-transparent"
        >
          <h1 className="text-center text-3xl font-bold text-black mb-6">
            Contact Us
          </h1>

          <div className="grid gap-5">
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
                className="focus-visible:ring-0 hover:shadow-[#fa4f09] border-black"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
                className="focus-visible:ring-0 hover:shadow-[#fa4f09] border-black"
              />
            </div>
            <div>
              <Label>Message</Label>
              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="w-full p-2 border border-black rounded-md hover:shadow-[#fa4f09] bg-transparent focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-5">
            {loading ? (
              <Button className="w-full bg-[#fa4f09] text-white rounded-md">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-black text-white rounded-md hover:bg-[#fa4f09]"
              >
                Send
              </Button>
            )}
          </div>

          {message && (
            <p className="text-center font-bold my-3 text-red-600">{message}</p>
          )}
        </motion.form>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
