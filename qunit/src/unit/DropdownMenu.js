import './Dropdown.css';
import './UnitItem.css'; 
import { useState, useEffect } from "react";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

let data = require('../data/units.json');

function DropdownMenu(props) {

  let dataTitles = []

  // parses the titles for the dropdown menu
  function parseDropdown() {
    for( var title in data ){
      dataTitles.push(title);
    }
  }

  parseDropdown()

  // selected item is the item selected from the dropdown menu, default to distance/length
  // list is the list of units we're showing, default to distance/length
  // focus is the currently focused unit, default to 0
  // scale is the scale of the currently focused unit, default to 1
  const [selectedItem, setSelectedItem] = useState(dataTitles[0]);
  const [list, setList] = useState(changeList(0))
  const [focus, setFocus] = useState(0); 
  const [scale, setScale] = useState(1);

  /**
   * 
   * @param {*} index index number of unit
   * @param {*} unit name of unit
   * @param {*} event handling events
   */
  function convert(index, unit, event, s, f, b) {
    let dataContent = []
    dataContent = data[dataTitles[index]]
    let unitListComponents = []
    var newThing = event.target.value

    console.log("f: ", f)
    console.log(dataContent["id"]["FunctionIndex"])

   if (dataContent["id"]["FunctionIndex"] == 0 || dataContent["id"]["FunctionIndex"] == 1) {
      Object.keys(dataContent).map((oneKey, i) => {
          if (oneKey != "id") {
            if (i == f) {
              unitListComponents.push(
                <div className="flexUnit">
                <Container>
                    <Row>
                    <Col xs={6} className="unit">
                        <p id="unitname">{dataContent[oneKey]["Name"] + " (" + dataContent[oneKey]["Prompt"] + ")"}</p>
                    </Col>
                    <Col xs={6} className="val">
                        <input type="number" name="name" defaultValue={newThing} id="textfield"
                        key={newThing}
                        onChange={(e) => textChange(i, dataContent[oneKey]["Scale"], e)}
                        onClick={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                        onFocus={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                        onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                        onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])} 
                        />
                    </Col>
                    </Row>
                </Container>
                </div>
              )
            } else {
              console.log((parseFloat((dataContent[oneKey]["Scale"]) * newThing) / s) - Number(dataContent[oneKey]["Base"] - b*(dataContent[oneKey]["Scale"] / s)))
              unitListComponents.push(
                <div className="flexUnit">
                <Container>
                    <Row>
                    <Col xs={6} className="unit">
                        <p id="unitname">{dataContent[oneKey]["Name"] + " (" + dataContent[oneKey]["Prompt"] + ")"}</p>
                    </Col>
                    <Col xs={6} className="val">
                        <input type="number" name="name" 
                        defaultValue={(parseFloat((dataContent[oneKey]["Scale"]) * newThing) / s) - Number(dataContent[oneKey]["Base"] - b * (dataContent[oneKey]["Scale"] / s)) } 
                        id="textfield"
                        key={dataContent[oneKey]["Scale"] * newThing / s}
                        onChange={(e) => textChange(i, dataContent[oneKey]["Scale"], e)}
                        onClick={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                        onFocus={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                        onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                        onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])} 
                        />
                    </Col>
                    </Row>
                </Container>
                </div>
              )
            }
          }
      })
    } else if (dataContent["id"]["FunctionIndex"] == 2) {
        let apiVal = dataContent["Item1"]["Scale"]
        let baumeVal = dataContent["Item2"]["Scale"]
        let sgVal = dataContent["Item3"]["Scale"]
        let sgData = []
        console.log("newThing ", newThing);
        switch (f - 1) {
          case 0: // API 
            apiVal = newThing
            sgVal = 141.5 / (parseInt(apiVal) + 131.5)
            if (sgVal <= 0) {
              baumeVal = 140 / sgVal - 130.0;
            } else {
              baumeVal = 145.0 * ( 1.0 - 1.0 / sgVal);
            }
            console.log("baumeVal in 0: ", baumeVal)
            break; 
          case 1: // Baume
            baumeVal = newThing
            if( parseInt(baumeVal) < 10.0 ) {
              sgVal = 145 / ( 145 - parseInt(baumeVal) );
            } else {
              sgVal = 140 / ( 130 + parseInt(baumeVal) );
            } 
            apiVal = 141.5 / sgVal - 131.5;
            break; 
          case 2: // SG
            sgVal = newThing
            apiVal = 141.5 / parseInt(sgVal) - 131.5;
            if(sgVal <= 1.0 ) {
              baumeVal = 140 / parseInt(sgVal) - 130.0;
            } else {
              baumeVal = 145.0 * ( 1.0 - 1.0 / parseInt(sgVal));
            } 
            break; 
          default: 
            apiVal = newThing
            sgVal = 141.5 / ( apiVal + 131.5);
            if (sgVal <= 0) {
              baumeVal = 140 / sgVal - 130.0;
            } else {
              baumeVal = 145.0 * ( 1.0 - 1.0 / sgVal);
            }
            break; 
        } 

        sgData.push(apiVal)
        sgData.push(baumeVal)
        sgData.push(sgVal)

        Object.keys(dataContent).map((oneKey, i) => {
          if (oneKey != "id") {
            unitListComponents.push(
              <div className="flexUnit">
              <Container>
                  <Row>
                  <Col xs={6} className="unit">
                      <p id="unitname">{dataContent[oneKey]["Name"] + " (" + dataContent[oneKey]["Prompt"] + ")"}</p>
                  </Col>
                  <Col xs={6} className="val">
                      <input type="number" name="name" defaultValue={sgData[i - 1]} id="textfield"
                      key={sgData[i - 1]}
                      onChange={(e) => textChange(i, dataContent[oneKey]["Scale"], e)}
                      onClick={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onFocus={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                      onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])} 
                      />
                  </Col>
                  </Row>
              </Container>
              </div>
            )
          }
      })

        // update list

    } 
    setList(unitListComponents)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleKeyPress(index, unit, event, s, f, b) {
      console.log("handlekey index: ", index);
      console.log("handlekey unit: ", unit);
      if(event.key === 'Enter'){
          convert(index, unit, event, s, f, b)
      }
  }

  function textChange(i, s, name, event) {
    setFocus(i)
    setScale(s)
  }

  /**
   * Changes selected item from dropdown menu
   * @param {*} title name of the selected item
   * @param {*} index index of selected item
   */
  function changeSelectedItem(title, index) {
    setSelectedItem(dataTitles[index])
    let dataContent = []
    dataContent = data[dataTitles[index]]

    let unitListComponents = []
    if (dataContent["id"]["FunctionIndex"] == 0 || dataContent["id"]["FunctionIndex"] == 1) {
      Object.keys(dataContent).map((oneKey, i) => {
        if (oneKey != "id") {
            console.log("index in changeSelectedItem ", index)
            unitListComponents.push(
              <div className="flexUnit">
              <Container>
                  <Row>
                  <Col xs={6} className="unit">
                      <p id="unitname">{dataContent[oneKey]["Name"] + " (" + dataContent[oneKey]["Prompt"] + ")"}</p>
                  </Col>
                  <Col xs={6} className="val">
                      <input type="number" name="name" defaultValue={ Number(dataContent[oneKey]["Scale"]) - Number(dataContent[oneKey]["Base"]) } id="textfield"
                      key={ dataContent[oneKey]["Scale"] }
                      onChange={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onClick={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onFocus={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                      onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])} 
                      />
                  </Col>
                  </Row>
              </Container>
              </div>
            )
        }
      })
    } else if (dataContent["id"]["FunctionIndex"] == 2) {
        let apiVal = 0
        let baumeVal = 10.2473
        let sgVal = 1.07605
        let sgData = []
        sgData.push(apiVal)
        sgData.push(baumeVal)
        sgData.push(sgVal)

        Object.keys(dataContent).map((oneKey, i) => {
          if (oneKey != "id") {
            unitListComponents.push(
              <div className="flexUnit">
              <Container>
                  <Row>
                  <Col xs={6} className="unit">
                      <p id="unitname">{dataContent[oneKey]["Name"] + " (" + dataContent[oneKey]["Prompt"] + ")"}</p>
                  </Col>
                  <Col xs={6} className="val">
                      <input type="number" name="name" defaultValue={sgData[i - 1]} id="textfield"
                      key={sgData[i - 1]}
                      onChange={(e) => textChange(i, dataContent[oneKey]["Scale"], e)}
                      onClick={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onFocus={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                      onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])} 
                      />
                  </Col>
                  </Row>
              </Container>
              </div>
            )
          }
      })
    }
    setList(unitListComponents)
  }

  function changeList(index) {
    let unitListComponents = []
    let dataContent = []
    dataContent = data[dataTitles[index]]

    Object.keys(dataContent).map((oneKey, i) => {
      if (oneKey != "id") {
            unitListComponents.push(
              <div className="flexUnit">
              <Container>
                  <Row>
                  <Col xs={6} className="unit">
                      <p id="unitname">{dataContent[oneKey]["Name"] + " (" + dataContent[oneKey]["Prompt"] + ")"}</p>
                  </Col>
                  <Col xs={6} className="val">
                      <input type="number" name="name" defaultValue={ Number(dataContent[oneKey]["Scale"]) - Number(dataContent[oneKey]["Base"]) } id="textfield"
                      key={ dataContent[oneKey]["Scale"] }
                      onChange={(e) => textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onClick={(e) =>  textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onFocus={(e) =>  textChange(i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Name"], e)}
                      onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                      onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])} 
                      />
                  </Col>
                  </Row>
              </Container>
              </div>
            )
      }
    })
    return unitListComponents;
  }
  
  return (
    <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <span id="dropdown">{ selectedItem }</span>
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdownmenu">
            {dataTitles.map((title, index) => {
              return <Dropdown.Item onClick={()=>changeSelectedItem(title, index)}>{title}</Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown>
        <div>
          { list.map((item) =>  {
            return item;
          })}
        </div>
    </div>
  );
}

export default DropdownMenu;
