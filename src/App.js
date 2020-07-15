import React, { useState, useEffect, Suspense } from "react";
import ToTopButton from "./components/ToTopButton/ToTopButton";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import "./App.css";

const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const UserProfile = React.lazy(() =>
  import("./components/UserProfile/UserProfile")
);

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
      <Suspense fallback={<LoadingIndicator />}>
        <Navbar />
        <UserProfile />
        {scrollValue > 130 ? <ToTopButton /> : null}
      </Suspense>
    </div>
  );
}

export default App;
