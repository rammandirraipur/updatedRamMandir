import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <section className="home-section" id="home">
      <div className="video-background">
        <video
          className="background-video"
          src="/Assets/bg.mp4"
          autoPlay
          loop
          muted
        />
      </div>
      <div className="home-content animate-bottom">
        <h1>Welcome to Shri Ram Mandir Raipur</h1>
        <p>
          A sacred initiative to serve the divine Ram Mandir — a symbol of peace,
          devotion, and unity. Join us in this noble cause.
        </p>
        {/* <a href="#donation" className="btn-primary">Contribute Now</a> */}
      </div>
    
    </section>
  );
};

export default Home;
