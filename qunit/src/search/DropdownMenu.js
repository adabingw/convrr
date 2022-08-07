import './Dropdown.css';
import { useState, useEffect } from "react";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import UnitItem from './UnitItem';
import UnitList from './UnitList';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

let data = require('../data/units.json');

function DropdownMenu(props) {

  let dataTitles = []

  function parseDropdown() {
    for( var title in data ){
      // console.log(title);
      dataTitles.push(title);
    }
  }

  parseDropdown()

  const [selectedItem, setSelectedItem] = useState(dataTitles[0]);
  const [list, setList] = useState(changeList(0))
  const [focus, setFocus] = useState(0); 
  const [scale, setScale] = useState(1);

  useEffect(() => {
    
  }, [list]);

  function convert(scale, index, unit, event) {
    let dataContent = []
    dataContent = data[dataTitles[index]]

    console.log("event: ", event)
    console.log("in convert")
    console.log("index: ", index)
    console.log("scale: ", scale)
    console.log("unit changed: ", unit)
    console.log("new value: ", event.target.value)
    console.log("title of cat: ", selectedItem)

    // let unitListComponents = []
    // Object.keys(dataContent).map((oneKey) => {
    //   if (oneKey != "id") {


    //       unitListComponents.push(
    //         <div className="flexUnit">
    //         <Container>
    //             <Row>
    //             <Col xs={6} className="unit">
    //                 <p id="unitname">{dataContent[oneKey]["Name"]}</p>
    //             </Col>
    //             <Col xs={6} className="val">
    //                 <input type="text" name="name" value={dataContent[oneKey]["Scale"]} id="textfield" 
    //                 onChange={() => textChange(index, dataContent[oneKey]["Scale"])}
    //                 onBlur={(e) => convert(dataContent[oneKey]["Scale"], index, dataContent[oneKey]["Name"], e)}
    //                 onKeyPress={(e) => handleKeyPress(dataContent[oneKey]["Scale"], index, dataContent[oneKey]["Name"], e)} />
    //             </Col>
    //             </Row>
    //         </Container>
    //         </div>
    //       )
    //   }
    // })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleKeyPress(scale, index, unit, event) {
      console.log("keypressed")
      console.log(event.key)
      console.log(event.target.value)
      if(event.key === 'Enter'){
          convert(scale, index, unit, event)
      }
  }

  function textChange(index, scale, event) {
    setFocus(index)
    setScale(scale)
  }

  function changeSelectedItem(title, index) {
    setSelectedItem(dataTitles[index])
    let dataContent = []
    dataContent = data[dataTitles[index]]

    let unitListComponents = []
    Object.keys(dataContent).map((oneKey, index) => {
      if (oneKey != "id") {
        console.log("scaaaaaaale ", dataContent[oneKey]["Scale"])
          unitListComponents.push(
            <div className="flexUnit">
            <Container>
                <Row>
                <Col xs={6} className="unit">
                    <p id="unitname">{dataContent[oneKey]["Name"]}</p>
                </Col>
                <Col xs={6} className="val">
                    <input type="text" name="name" defaultValue={ dataContent[oneKey]["Scale"] } id="textfield"
                    onChange={(e) => textChange(index, dataContent[oneKey]["Scale"], e)}
                    onClick={() => setFocus(index)}
                    onFocus={() => setFocus(index)}
                    onBlur={(e) => convert(dataContent[oneKey]["Scale"], index, dataContent[oneKey]["Name"], e)}
                    onKeyPress={(e) => handleKeyPress(dataContent[oneKey]["Scale"], index, dataContent[oneKey]["Name"], e)} 
                    />
                </Col>
                </Row>
            </Container>
            </div>
          )
      }
    })
    setList(unitListComponents)
  }

  function changeList(index) {
    let unitListComponents = []
    let dataContent = []
    dataContent = data[dataTitles[index]]

    Object.keys(dataContent).map((oneKey) => {
      if (oneKey != "id") {
            unitListComponents.push(
              <div className="flexUnit">
              <Container>
                  <Row>
                  <Col xs={6} className="unit">
                      <p id="unitname">{dataContent[oneKey]["Name"]}</p>
                  </Col>
                  <Col xs={6} className="val">
                      <input type="text" name="name" defaultValue={ dataContent[oneKey]["Scale"] } id="textfield"
                      onChange={(e) => textChange(index, dataContent[oneKey]["Scale"], e)}
                      onClick={(e) =>  textChange(index, dataContent[oneKey]["Scale"], e)}
                      onFocus={(e) =>  textChange(index, dataContent[oneKey]["Scale"], e)}
                      onBlur={(e) => convert(dataContent[oneKey]["Scale"], index, dataContent[oneKey]["Name"], e)}
                      onKeyPress={(e) => handleKeyPress(dataContent[oneKey]["Scale"], index, dataContent[oneKey]["Name"], e)} 
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
            <span id="dropdown">{selectedItem}</span>
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
