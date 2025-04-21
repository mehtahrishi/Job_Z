import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      {/* Footer for the current page */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "transparent",
          font:"status-bar"
        }}
      >
        <p>©2024 - 2025 Job - Z. All Rights Reserved.</p>
        <p>
          Powered by <a href="https://github.com/mehtahrishi">Hrishi Mehta with love. 🗿</a>
        </p>
       
      </div>
    </div>
  );
};

export default Footer;
