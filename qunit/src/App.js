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
import Button from "./Button"
import TextField from "@mui/material/TextField"
import UnitTest from "./data/UnitTest.xml";
import DropdownMenu from "./unit/DropdownMenu.js"

let data = require('./data/units.json');

function App() {
  const [active, setActive] = useState("1");

  const setActiveTab = (id) => {
      setActive(id)
  }


  const getActiveTab = (index) => {
      let current = <div><p>{active}</p></div>
      switch(index) {
        case 1: 
          current = <div className="prompt">
            <TextField id="standard-basic" label="Input thing to search" variant="standard" className="prompt"/>
            <DropdownMenu />
          </div>
          break;
        case 2:
          current = <div><p>shiho sakurashiro</p></div> 
          break; 
        case 3: 
          current = <div className="about-div">
                      <h3 className="about-header">ABOUT ME</h3>
                      <p className="about">
                        Hello! My name is Ada and I'm a Software Engineering student at the University of Waterloo. <br /> <br />
                        QUnit is a fast unit conversion app created to group all unit conversion together in one bundle. <br /> <br />
                        More features soon to come! <br /> <br />
                      </p>
                    </div>
          break; 
        case 4: 
          current = <div><p>mai hirose</p></div>
          break;
        default: 
          current = <div className="prompt">
          <TextField id="standard-basic" label="Input thing to search" variant="standard" className="prompt"/>
          <DropdownMenu />
        </div>
      }
      return current;
  }

  return (
    <div className="App">
      <Container>
        <Row >
          <Col xs={3} className="one">
            <div className="menuFlex">
              <Button type="home" id="1" onClick={(()=>setActiveTab(1))} text="CONVRR" />
              <Button type="button" id="1" onClick={()=>setActiveTab(1)} status={active == "1"} text="U N I T S"/>
              {/* <Button type="button" id="2" onClick={()=>setActiveTab(2)} status={active == "2"} text="W I K I"/> */}
              <Button type="button" id="3" onClick={()=>setActiveTab(3)} status={active == "3"} text="A B O U T"/>
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
