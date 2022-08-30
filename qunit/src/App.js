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
                      <h3 className="about-header">ABOUT ME</h3>
                      <p className="about">
                        Hello! My name is Ada and I'm a Software Engineering student at the University of Waterloo. <br /> <br />
                        More features soon to come! <br /> <br />
                      </p>
                    </div>
          break; 
        case 4: 
          current = <div><p>mai hirose</p></div>
          break;
        default: 
          current = <QUnit />
      }
      return current;
  }

  return (
    <div className="App">
      <Container>
        <Row >
          <Col xs={3} className="one">
            <div className="menuFlex">
              <Button type="home" id="1" onClick={(()=>updateRefresh())} text="CONVRR" />
              <Button type="button" id="1" onClick={()=>setActiveTab(1)} status={active == "1"} text="UNITS"/>
              <Button type="button" id="2" onClick={()=>setActiveTab(2)} status={active == "2"} text="CURRENCY"/>
              <Button type="button" id="3" onClick={()=>setActiveTab(3)} status={active == "3"} text="ABOUT"/>
              {/* <Button type="button" id="4" onClick={()=>setActiveTab(4)} status={active == "4"} text="G I T H U B"/> */}
            </div>
          </Col>
          <Col xs={9} className="two">
            <h1>{getActiveTab(active)}</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
