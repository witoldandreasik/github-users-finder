import React from "react";
import "./ToBottomButton.css";

function ToBottomButton() {
  let scrollReq = require("react-scroll");
  let scroll = scrollReq.animateScroll;
  const toBottom = () => {
    scroll.scrollToBottom();
  };
  return (
    <button className="button button-bottom" onClick={toBottom}>
      <em className="button__icon fas fa-angle-down"></em>
    </button>
  );
}
export default ToBottomButton;
