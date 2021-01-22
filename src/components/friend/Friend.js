import React from "react";
import "./Friend.css";

function Friend({ name }) {
  return (
    <div className="friend">
      <div className="friend__content">
        <h3>{name}</h3>
        {/* <CloseIcon fontSize="large" style={{ color: "red" }} cursor="pointer" /> */}
      </div>
    </div>
  );
}

export default Friend;
