/* eslint-disable no-undef */
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useState } from "react";
import React from "react";
import Button from "./utils/Button"
import QUnit from "./unit/QUnit.js"
import QCurrency from "./currency/QCurrency.js"

function App() {
  const [active, setActive] = useState("1");

  function setActiveTab(tab) {
    setActive(tab)
  }

  const getActiveTab = (index) => {
      let current = <div><p>{active}</p></div>
      switch(index) {
        case 1: 
          current = <QUnit />
          break;
        case 2:
          current = <QCurrency />
          // current = <div className="unfortunate"><h6>Unfortunately, this feature isn't available due to limited resources ;-;</h6></div>
          break; 
        case 3: 
          current = <div className="about-div">
                      <a href="https://github.com/adabingw/convrr" target="_blank"><i class="fa-brands fa-github fa-md"></i>where the code lives.</a>
                      <a href="https://www.linkedin.com/in/adabingw/" target="_blank"><i class="fa-brands fa-linkedin fa-md"></i>where i am.</a>
                    </div>
          break; 
        default: 
          current = <QUnit />
      }
      return current;
  }

  return (
    <div className="App">
        <div className="one">
          <div className="menuFlex">
            <Button type="home" id="1" onClick={(()=>updateRefresh())} text="convrr" />
            <Button type="button" id="1" onClick={()=>setActiveTab(1)} status={active == "1"} text="units"/>
            <Button type="button" id="2" onClick={()=>setActiveTab(2)} status={active == "2"} text="currency"/>
            <Button type="button" id="3" onClick={()=>setActiveTab(3)} status={active == "3"} text="about"/>
          </div>
        </div>
        <div className="two">
          <h1>{getActiveTab(active)}</h1>
        </div>
    </div>
  );
}

export default App;
