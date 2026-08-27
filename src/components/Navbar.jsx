import React, { useState } from "react";
import { FaBars, FaTimes, FaOm } from "react-icons/fa";
import "./Navbar.css";
import { useAuth } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
    closeMenu();
  };

  // Scroll helper for homepage sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle nav clicks for internal page sections
  const handleNavClick = (sectionId) => {
    closeMenu();
    if (location.pathname !== "/") {
      // Navigate to homepage first, then scroll after a short delay
      navigate("/");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      // Already on homepage, just scroll
      scrollToSection(sectionId);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => { closeMenu(); navigate("/"); }}>
        <img src="../Assets/logo.png" alt="Logo" />
        Shri Ram Mandir Raipur
      </div>

      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <button className="nav-link" onClick={() => handleNavClick("home")}>Home</button>
        <button className="nav-link" onClick={() => handleNavClick("about")}>About</button>
        <button className="nav-link" onClick={() => handleNavClick("gallery")}>Gallery</button>
        <button className="nav-link" onClick={() => handleNavClick("blog")}>Blogs</button>
        <button className="nav-link" onClick={() => handleNavClick("DarshanTimingPage")}>Darshan Timing</button>
        <button className="nav-link" onClick={() => handleNavClick("livearti")}>Live Aarti</button>
        <button className="nav-link" onClick={() => handleNavClick("contactInfo")}>Contact</button>

        {!user ? (
          <button
            className="nav-link donate-btn"
            onClick={() => {
              closeMenu();
              navigate("/auth");
            }}
          >
            <FaOm /> <b>DONATE</b>
          </button>
        ) : (
          <div className="user-dropdown">
            <button
              className="nav-link user-toggle"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
            >
             Hi {user.displayName} ▾
            </button>
            {userMenuOpen && (
              <div className="user-menu">
                <button
                  className="user-menu-item"
                  onClick={() => {
                    navigate("/donation");
                    closeMenu();
                  }}
                >
                  Donation
                </button>
                <button
                  className="user-menu-item"
                  onClick={() => {
                    navigate("/dashboard");
                    closeMenu();
                  }}
                >
                  Dashboard
                </button>
                <button className="user-menu-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
