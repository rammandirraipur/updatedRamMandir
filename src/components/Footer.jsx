import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer" id="contactInfo">

      <h3 className="footer-heading">CONTACT US</h3>

      <div className="contact-info">
        <p>We'd love to hear from you. Reach out to join seva or for temple inquiries.</p>
      </div>

      <div className="social-icons">
        <a href="https://www.instagram.com/shreerammandir214?utm_source=qr&igsh=MTgwa3Bubndmem8xaA==" target="_blank"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
        <a href="https://www.youtube.com/live/JB3OC5wFKDA?si=W1ckSEEWALMnkLIx" target="_blank"><FontAwesomeIcon icon={faYoutube} /> YouTube</a>
        <a href="https://www.facebook.com/share/1BMXaCL3G3/?mibextid=wwXIfr" target="_blank"><FontAwesomeIcon icon={faFacebook} /> Facebook</a>
        <a href="mailto:rammandirraipur@gmail.com"><FontAwesomeIcon icon={faEnvelope} /> Email</a>
      </div>

      <div className="contact-numbers">
        <div className="contact-box">
          <p><strong>Trust Prabandhak  (Hemant Karmele)</strong></p>
          <p>+91 9977227199</p>
        </div>
        <div className="contact-box">
          <p><strong>Mandir Prabandhak (Umesh Shukla)</strong></p>
          <p>+91 8720040199</p>
        </div>
        <div className="contact-box">
          <p><strong>Mandir Pradhan Pujari (Hanumanth Ji)</strong></p>
          <p>+91 7000932687</p>
        </div>
        <div className="contact-box">
          <p><strong>Mandir Landline</strong></p>
          <p>+91 7117406118</p>
        </div>
      </div>

      <p className="footer-copy">© {new Date().getFullYear()} Ram Mandir Raipur | All Rights Reserved , Developed By <a href="https://namanjainottportfolio.netlify.app/" target="_blank" style={{textDecoration:"none"}}>Naman Jain</a></p>
    </footer>
  );
};

export default Footer;
