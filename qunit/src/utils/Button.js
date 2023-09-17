import './Button.css';
import React from "react";

function Button(props) {

  return (
    <div className={props.type + " " + (props.status ? "activeClass" : "inactiveClass")} onClick={() => props.onClick(props.id)}>
        <h1 className={props.type}>{props.text}</h1>
    </div>
  );
}

export default Button;
