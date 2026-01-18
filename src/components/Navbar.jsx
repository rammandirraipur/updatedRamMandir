import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { FaOm } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu open/close state
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close the menu when a link is clicked
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="../Assets/logo.png" alt="" /> Shri Ram Mandir Raipur
      </div>
      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <a href="#home" className="nav-link" onClick={closeMenu}>
          Home
        </a>
        <a href="#about" className="nav-link" onClick={closeMenu}>
          About
        </a>
        <a href="#gallery" className="nav-link" onClick={closeMenu}>
          Gallery
        </a>
         <a href="#blog" className="nav-link" onClick={closeMenu}>
          Blogs
        </a>
         <a href="#livearti" className="nav-link" onClick={closeMenu}>
          Live Aarti
        </a>
        <a href="#contactInfo" className="nav-link" onClick={closeMenu}>
          Contact
        </a>
{/* <a href="#donation" className="nav-link donate-btn" onClick={closeMenu}>
  <span className="donate-icon">
    <FaOm />
  </span>
  <b>DONATE</b>
</a> */}
      </div>
      <div className="hamburger" id="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
