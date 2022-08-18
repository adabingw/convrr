import './Dropdown.css';
import { useState, useEffect, useRef } from "react";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Rating from '@mui/material/Rating';

let data = require('../data/units.json');

function DropdownMenu(props) {

  // unit category
  let dataTitles = []

  // parses the titles for the dropdown menu
  function parseDropdown() {
    for( var title in data ){
      dataTitles.push(title);
    }
  }

  parseDropdown()

  // states
  const [focus, setFocus] = useState(0); 
  const [selectedItem, setSelectedItem] = useState(dataTitles[0]);
  const [list, setList] = useState(changeSelectedItem(0, 0))
  const [curr, setCurr] = useState(0);
  const [favourites, setFavourites] = useState([]);

  let prompt = props.prompt
  // 0: "Length;Distance"
  // 1: (5) ['Prompt', 'm', 1, '1', '0']
  let val = props.val
  let species = props.type

  // from search
  if (typeof val != "undefined") {
      const curr_list = [0, 0, 0, prompt[1][3], prompt[1][2], prompt[1][4], prompt[0], val, 1]
      if (String(species).toLowerCase() == "category") {
        if (selectedItem != prompt[0]) {
          setSelectedItem(prompt[0])
          changeSelectedItem(dataTitles.indexOf(prompt[0]), 1)
        }
      } else {
        if (JSON.stringify(curr_list) != JSON.stringify(curr)) {
          setCurr(curr_list)
          convert(0, 0, 0, prompt[1][3], prompt[1][2], prompt[1][4], prompt[0], val, 1)
        }
      }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleKeyPress(index, unit, event, s, f, b) {
      if(event.key === 'Enter'){
          convert(index, unit, event, s, f, b, null, null, 0)
      }
  }

  function textChange(i) {
    setFocus(i)
  }

  function starFavourites(event, title) {
    event.stopPropagation()
  }

  // TODO: change focus
  function handleKeyDown(event) {
      // up: 38; down: 40
      console.log(event.keyCode)
      if (event.keyCode == 38) {
          console.log("KEY UP ARROW")
          event.preventDefault()
          // setFocus(focus + 1)
      } else if (event.keyCode == 40) {
          console.log("KEY DOWN ARROW")
          event.preventDefault()
          // setFocus(focus - 1)
      }
  }

  function textFocus(event) {
      event.target.select()
  }

  function DropdownItemClick(title, index) {
    setCurr(0)
    prompt = undefined 
    val = undefined 
    species = undefined
    props.zombie()
    changeSelectedItem(index, 1)
  }

  function FavouritesItemClick(title) {
    setCurr(0)
    prompt = undefined 
    val = undefined 
    species = undefined
    props.zombie()
    if (dataTitles.indexOf(title) != -1) {
      changeSelectedItem(dataTitles.indexOf(title), 1)
    }
  }

  // =================================================================================================================================

  function convert(index, unit, event, s, f, b, name, newVal, type, u) {
    let dataContent = []

    // get list of units based on index and dataTitles
    let unitListComponents = []
    var newThing = 1

    // eslint-disable-next-line default-case
    switch(type) {
      // from input
      case 0:
        dataContent = data[dataTitles[index]]
        newThing = event.target.value
        break; 
      // from search
      case 1:
        dataContent = data[name]
        setSelectedItem(dataTitles[dataTitles.indexOf(name)])
        newThing = newVal
        break;
    }

    if (dataContent["id"]["FunctionIndex"] == 0 || dataContent["id"]["FunctionIndex"] == 1) {
      Object.keys(dataContent).map((oneKey, i) => {
          let p = <p id="unitname">{dataContent[oneKey]["Name"] + " (" + dataContent[oneKey]["Prompt"] + ")"}</p>
          console.log("FOCUS == I: ", focus == i)
          if (String(dataContent[oneKey]["Prompt"]).includes('^')) {
            let unitPrompt = dataContent[oneKey]["Prompt"]
            let split = unitPrompt.split('^') 
            let splitNum = parseInt(split[1])
            let splitAfterNum = split[1].split(String(parseInt(splitNum)))
            if (splitAfterNum[1] != undefined) {
              p = <p id="unitname">{dataContent[oneKey]["Name"] + " (" + split[0]}<sup>{splitNum} </sup>{splitAfterNum[1] + ")"}</p>
            } else {
              p = <p id="unitname">{dataContent[oneKey]["Name"] + " (" + split[0]}<sup>{splitNum} </sup> { ")"}</p>
            }
          }
          if (oneKey != "id") {
            if (i == f) {
              unitListComponents.push(
                <div className="flexUnit">
                <Container>
                    <Row>
                    <Col xs={6} className="unit">
                        {p}
                    </Col>
                    <Col xs={6} className="val">
                        <input type="number" name="name" defaultValue={newThing} id="textfield"
                        key={newThing}
                        onChange={(e) => textChange(i)}
                        onClick={(e) => textFocus(e)}
                        onFocus={(e) => textFocus(e)}
                        onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                        onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onWheel={(e) => e.target.blur()} 
                        />
                    </Col>
                    </Row>
                </Container>
                </div>
              )
            } else {
              unitListComponents.push(
                <div className="flexUnit">
                <Container>
                    <Row>
                    <Col xs={6} className="unit">
                        {p}
                    </Col>
                    <Col xs={6} className="val">
                        <input type="number" name="name" 
                        defaultValue={(parseFloat((dataContent[oneKey]["Scale"]) * newThing) / s) - Number(dataContent[oneKey]["Base"] - b * (dataContent[oneKey]["Scale"] / s)) } 
                        id="textfield"
                        key={dataContent[oneKey]["Scale"] * newThing / s}
                        onChange={(e) => textChange(i)}
                        onClick={(e) => textFocus(e)}
                        onFocus={(e) => textFocus(e)}
                        onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                        onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onWheel={(e) => e.target.blur()} 
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
        switch (f - 1) {
          case 0: // API 
            apiVal = newThing
            sgVal = 141.5 / (parseInt(apiVal) + 131.5)
            if (sgVal <= 0) {
              baumeVal = 140 / sgVal - 130.0;
            } else {
              baumeVal = 145.0 * ( 1.0 - 1.0 / sgVal);
            }
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
                      onChange={(e) => textChange(i)}
                      onClick={(e) => textFocus(e)}
                      onFocus={(e) => textFocus(e)}
                      onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"], null, null, 0)}
                      onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])}
                      onKeyDown={(e) => handleKeyDown(e)}
                      onWheel={(e) => e.target.blur()} 
                      />
                  </Col>
                  </Row>
              </Container>
              </div>
            )
          }
      })
    } 
    if (unitListComponents != list) {
      setList(unitListComponents)
    }
  }

  /**
   * Changes selected item from dropdown menu
   * @param {*} title name of the selected item
   * @param {*} index index of selected item
   */
  function changeSelectedItem(index, initial) {
    console.log("FOCUS: ", focus)
    if (initial == 1) {
      setSelectedItem(dataTitles[index])
    }
    let unitListComponents = []
    let dataContent = data[dataTitles[index]]

    if (dataContent["id"]["FunctionIndex"] == 0 || dataContent["id"]["FunctionIndex"] == 1) {  
      Object.keys(dataContent).map((oneKey, i) => {
        let p = <p id="unitname">{dataContent[oneKey]["Name"] + " (" + dataContent[oneKey]["Prompt"] + ")"}</p>
        if (String(dataContent[oneKey]["Prompt"]).includes('^')) {
          let unitPrompt = dataContent[oneKey]["Prompt"]
          let split = unitPrompt.split('^') 
          let splitNum = parseInt(split[1])
          let splitAfterNum = split[1].split(String(parseInt(splitNum)))
          if (splitAfterNum[1] != undefined) {
            p = <p id="unitname">{dataContent[oneKey]["Name"] + " (" + split[0]}<sup>{splitNum} </sup>{splitAfterNum[1] + ")"}</p>
          } else {
            p = <p id="unitname">{dataContent[oneKey]["Name"] + " (" + split[0]}<sup>{splitNum} </sup> { ")"}</p>
          }
        }
        if (oneKey != "id") {
            unitListComponents.push(
              <div className="flexUnit">
              <Container>
                  <Row>
                  <Col xs={6} className="unit">
                      {p}
                  </Col>
                  <Col xs={6} className="val">
                      <input type="number" name="name" 
                      defaultValue={ Number(dataContent[oneKey]["Scale"]) - Number(dataContent[oneKey]["Base"]) } id="textfield"
                      key={ dataContent[oneKey]["Scale"] }
                      onChange={(e) => textChange(i)}
                      onClick={(e) => textFocus(e)}
                      onFocus={(e) => textFocus(e)}
                      onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"], null, null, 0)}
                      onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])} 
                      onKeyDown={(e) => handleKeyDown(e)}
                      onWheel={(e) => e.target.blur()}
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
        sgData.push(apiVal, baumeVal, sgVal)

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
                      onChange={(e) => textChange(i)}
                      onClick={(e) => textFocus(e)}
                      onFocus={(e) => textFocus(e)}
                      onBlur={(e) => convert(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"], null, null, 0)}
                      onKeyPress={(e) => handleKeyPress(index, dataContent[oneKey]["Name"], e, dataContent[oneKey]["Scale"], i, dataContent[oneKey]["Base"])} 
                      onKeyDown={(e) => handleKeyDown(e)}
                      onWheel={(e) => e.target.blur()}
                      />
                  </Col>
                  </Row>
              </Container>
              </div>
            )
          }
      })
    }

    if (initial == 0) {
      return unitListComponents
    } else if (initial == 1) {
      setList(unitListComponents)
    }
  }
  
  // https://stackoverflow.com/questions/35660124/how-to-persist-data-in-an-electron-app
  return (
    <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <span id="dropdown">Favourites</span>
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdownmenu">
            {favourites.map((title) => {
              return (
                <div>
                    <Dropdown.Item onClick={()=>FavouritesItemClick(title)} className="item">
                        {title}
                        <Rating className="favourite" 
                              size="small" max={1} value={1}
                              onClick={(event) => {
                                starFavourites(event, title)
                              }}
                              onChange={(event, newValue) => {
                                if (newValue == null) {
                                  setFavourites(favourites.filter(item => item !== title))
                                } else {
                                  setFavourites(favourites => [...favourites, title])
                                }
                              }}
                        />
                    </Dropdown.Item>
                </div>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <span id="dropdown">{ selectedItem }</span>
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdownmenu">
            {dataTitles.map((title, index) => {
              return (
                <div>
                    <Dropdown.Item onClick={()=>DropdownItemClick(title, index)} className="item">
                        {title}
                        <Rating className="favourite" 
                              size="small" max={1} 
                              onClick={(event) => {
                                starFavourites(event, title)
                              }}
                              onChange={(event, newValue) => {
                                if (newValue == null) {
                                  setFavourites(favourites.filter(item => item !== title))
                                } else {
                                  setFavourites(favourites => [...favourites, title])
                                }
                              }}
                              value = {favourites.includes(title) ? 1 : 0}
                        />
                    </Dropdown.Item>
                </div>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <div>
          { list.map((item) =>  {
            return item;
          })}
        </div>
        <div>
        </div>
    </div>
  );
}

export default DropdownMenu;
