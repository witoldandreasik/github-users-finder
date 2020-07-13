import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./components/UserProfile/UserProfile";
import ToTopButton from "./components/ToTopButton/ToTopButton";
import "./App.css";

function App() {
  const [scrollValue, setScrollValue] = useState(
    document.body.scrollTop || document.documentElement.scrollTop
  );

  const handleScroll = () => {
    setScrollValue(
      document.body.scrollTop || document.documentElement.scrollTop
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [scrollValue]);

  return (
    <div className="app">
      <Navbar />
      <UserProfile />
      {scrollValue > 130 ? <ToTopButton /> : null}
    </div>
  );
}

export default App;
