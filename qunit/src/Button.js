import './Button.css';
import { useState } from "react";
import React from "react";

function Button(props) {
  console.log(props.status)
  console.log(props.type)

  return (
    <div className={props.type + " " + (props.status ? "activeClass" : "inactiveClass")} onClick={() => props.onClick(props.id)}>
        <h1 className={props.type}>{props.text}</h1>
    </div>
  );
}

export default Button;
