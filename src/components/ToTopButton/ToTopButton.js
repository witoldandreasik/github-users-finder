import React from "react";
import "./ToTopButton.css";

function ToTopButton() {
  let scrollReq = require("react-scroll");
  let scroll = scrollReq.animateScroll;
  const toTop = () => {
    scroll.scrollToTop();
  };

  return (
    <button className="button" onClick={toTop}>
      <em className="button__icon fas fa-angle-up"></em>
    </button>
  );
}
export default ToTopButton;
