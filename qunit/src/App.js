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
import UnitTest from "./data/UnitTest.xml"

function App() {
  const [active, setActive] = useState("1");

  const setActiveTab = (id) => {
      setActive(id)
      getXML();
  }

  function readXML(xmlFile) {
    const xmlDoc = xmlFile.responseXML;
    var parser = new DOMParser();
    var x;    
    var txt = "";
    var y;
    y = xmlDoc.getElementsByTagName("entryresult");//.childNodes[0];
    x = y[1].getElementsByTagName("title")[0].childNodes[0].nodeValue;
  }

  function getXML() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("RESPONSE TEXT")
        console.log(xmlhttp.responseText)
        // readXML(xmlhttp)
      }
    };
    xmlhttp.open("GET", "./data/UnitTest.xml", true);
    // method: the type of request: GET or POST
    // url: the file location
    // async: true (asynchronous) or false (synchronous)
    xmlhttp.send();
  }

  const getActiveTab = (index) => {
      let current = <div><p>{active}</p></div>
      switch(index) {
        case 1: 
          console.log("one")
          current = <div className="prompt">
            <TextField id="standard-basic" label="Input thing to search" variant="standard" className="prompt"/>
          </div>
          break;
        case 2:
          console.log("two")
          current = <div><p>shiho sakurashiro</p></div> 
          break; 
        case 3: 
          console.log("three")
          current = <div><p>vel kim</p></div>
          break; 
        case 4: 
          console.log("four")
          current = <div><p>mai hirose</p></div>
          break;
        default: 
          console.log("def")
          current = <div className="prompt"><TextField id="standard-basic" label="Standard" variant="standard" /></div>
      }
      return current;
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={3} className="one">
            <div className="menuFlex">
              <Button type="home" id="1" onClick={(()=>setActiveTab(1))} text="QUnit" />
              <Button type="button" id="1" onClick={()=>setActiveTab(1)} status={active == "1"} text="S E A R C H"/>
              <Button type="button" id="2" onClick={()=>setActiveTab(2)} status={active == "2"} text="W I K I"/>
              <Button type="button" id="3" onClick={()=>setActiveTab(3)} status={active == "3"} text="A B O U T"/>
              <Button type="button" id="4" onClick={()=>setActiveTab(4)} status={active == "4"} text="G I T H U B"/>
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
