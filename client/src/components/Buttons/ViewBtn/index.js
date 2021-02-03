import React from "react";
import "./style.css";

function ViewBtn(props) {
  return (
    <span className="view-btn btn btn-primary" {...props} role="button" tabIndex="1">
      View
    </span>
  );
}

export default ViewBtn;