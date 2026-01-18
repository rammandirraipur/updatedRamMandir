import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Gallery from "./components/Gallery";
// import DonationForm from "./components/DonationForm";
import Footer from "./components/Footer";
import "./App.css";
import BowCursor from "./CursorEffect";
import BlogSection  from "./components/BlogSection";
import LiveAarti from "./components/LiveAarti";


function App() {
  return (
    <>
       

      <Navbar />
      <Home />
      <About />
      <Gallery />
        <BlogSection /> 
            <LiveAarti /> 
      {/* <DonationForm /> */}
      <Footer />
    </>
  );
}

export default App;
