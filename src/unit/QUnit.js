import './QUnit.css'
import Modal from 'react-modal';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { useState, useEffect } from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import DropdownMenu from "./DropdownMenu.js"
import fuzzysort from 'fuzzysort'
import { Link } from 'react-router-dom';


let data = require('../data/units.json');

function QUnit(props) {

    const [prompt, setPrompt] = useState(["undefined", "undefined", "undefined", "undefined", "undefined"]);
    const [open, setOpen] = useState(false);
    const [openErr, setOpenErr] = useState(false);
    const [searchResult, setSearch] = useState(["undefined"])
    const [value, setVal] = useState(undefined)
    const [type, setType] = useState(undefined)
    const [text, setText] = useState("")
  
    let dataTitles = []

    useEffect(() => {
      parseDropdown();
    }, []);
  
    function closeErrModalContent(val, one, typaThing) {
      setVal(val)
      setPrompt(one)
      setOpen(false)
      setType(one[1])
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleKeyPress(event) {
      if(event.key === 'Enter'){
          parseInput(text)
          setText("")
      }
    }
  
    function parseDropdown() {
      for( let title in data ){
        dataTitles.push(title);
      }
    }
  
    function zombie() {
      setVal(undefined)
      setPrompt(undefined)
      setText(undefined)
    }
  
    function checkFirstLetterSpace(_string) {
      return /^\s/.test( _string);
    }

    parseDropdown();
  
    function parseInput(i) {
      let input = []
      if (String(i).length === 0) {
        setVal(undefined)
        setPrompt(undefined)
        setText(undefined)
        return;
      }
  
      // if our input has a numeric value
      if (!isNaN(parseFloat(i))) {
        input.push(parseFloat(i))
        let afterNum = i.split(String(parseFloat(i)))
  
        // case: 1 amile
        if (checkFirstLetterSpace(afterNum[1])) {
          afterNum[1] = afterNum[1].slice(1)
        }
  
        // m vs M
        if (afterNum[1].length === 1) {
          input.push(afterNum[1])
          input.push("undefined")
        } else {
          let lowerEye = String(i).toLowerCase()
          let e = false;
          let esign = false;
          if (lowerEye.indexOf('e') !== -1) {
            e = ((String(lowerEye).charAt(lowerEye.indexOf('e') + 1) >= '0' && String(lowerEye).charAt(lowerEye.indexOf('e') + 1) <= '9')
                      && String(lowerEye).charAt(lowerEye.indexOf('e') + 1) != ' ')
            esign = ((String(lowerEye).charAt(lowerEye.indexOf('e') + 1) == '+' || String(lowerEye).charAt(lowerEye.indexOf('e') + 1) == '-')
                        && !isNaN(String(lowerEye).charAt(lowerEye.indexOf('e') + 2)))
          }

          if (lowerEye.indexOf('e') !== -1) {
              if (e) {
                let lowerEye2 = lowerEye.slice(lowerEye.indexOf('e') + 1);
                afterNum = lowerEye2.split(String(parseFloat(lowerEye2)))
              } else if (esign) {
                let lowerEye2 = lowerEye.slice(lowerEye.indexOf('e') + 2);
                afterNum = lowerEye2.split(String(parseFloat(lowerEye2)))
              }
    
              if (typeof afterNum[1] != "undefined") {
                // if our input has an equal sign
                if (afterNum[1].indexOf('=') !== -1) {
                  let unit = String(afterNum[1]).substr(0, String(afterNum[1]).indexOf('=')); 
                  let result = String(afterNum[1].substr(String(afterNum[1]).indexOf('?') + 1));
                  input.push(unit)
                  input.push(result)
                } else {
                  input.push(afterNum[1])
                  input.push("undefined")
                }
              } else {
                setOpenErr(true)
              }
          } else if (afterNum[1] !== "" && !e) {
              // if our input has an equal sign
              if (afterNum[1].indexOf('=') != -1) {
                let unit = String(afterNum[1]).substr(0, String(afterNum[1]).indexOf('=')); 
                let result = String(afterNum[1].substr(String(afterNum[1]).indexOf('?') + 1));
                input.push(unit)
                input.push(result)
              } else {
                input.push(afterNum[1])
                input.push("undefined")
              }
          } else {
            setOpenErr(true)
          }
        }
      } else {
        input.push("1")
        if (i.indexOf('=') !== -1) {
          let unit = i.substr(0, i.indexOf('=')); 
          let result = i.substr(i.indexOf('?') + 1);
          input.push(unit)
          input.push(result)
        } else {
          input.push(i)
          input.push("undefined")
        }
      }

      if (typeof input != "undefined") {
        if (typeof input[1] != "undefined") {
          search(input[0], input[1])
        }
      }
    }
  
    function search(val, input) {
      let search_list = []
      search_list["input"] = input
      search_list["val"] = val
  
      for ( let title of dataTitles ) {
        const name = title.split(/[ ;]+/);
        const lower_name = name.map(element => { return element.toLowerCase(); });
        let dataContent = data[title]
  
        if (String(input).length !== 1) {
          const resTitle = fuzzysort.go(input, [title])
          if (resTitle.length != 0) {
            if (resTitle[0].score > -20) {
              search_list[title] = "Category"
            }
          }
          if (lower_name.indexOf(String(input).toLowerCase()) != -1) {
            search_list[title] = "Category"
          }
        }

        let score = -100;
  
        // eslint-disable-next-line no-loop-func
        Object.keys(dataContent).map((oneKey, i) => {
          if (oneKey !== "id") {

            if (String(input).length === 1) {
                if (dataContent[oneKey]["Prompt"] === input) {
                  search_list[title] = ["Prompt", dataContent[oneKey]["Prompt"], i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Base"]]
                }
            } else {
                const res = fuzzysort.go(input, [dataContent[oneKey]["Name"]])
                const res2 = fuzzysort.go(input, [dataContent[oneKey]["Prompt"]])
                if (res.length !== 0) {
                    if (res[0].score > -15 && res[0].score > score) {
                        score = res[0].score 
                        search_list[title] = ["Name", dataContent[oneKey]["Name"], i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Base"]]
                    }
                }

                if (res2.length !== 0) {
                    if (res2[0].score > -15 && res2[0].score > score) {
                        score = res2[0].score
                        search_list[title] = ["Prompt", dataContent[oneKey]["Prompt"], i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Base"]]
                    }
                }

                // if (dataContent[oneKey]["Prompt"].toLowerCase() == input.toLowerCase()) {

                //   console.log(search_list[title])
                //   console.log("1: ", ["Prompt", dataContent[oneKey]["Prompt"], i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Base"]])
                //   search_list[title] = ["Prompt", dataContent[oneKey]["Prompt"], i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Base"]]
                // } else if (dataContent[oneKey]["Name"].toLowerCase() == input.toLowerCase()) {
                //   console.log("2: ", ["Name", dataContent[oneKey]["Name"], i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Base"]])
                //   search_list[title] = ["Name", dataContent[oneKey]["Name"], i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Base"]]
                // } else {
                //   if (res.length != 0 && res[0].score > -15) {
                //       search_list[title] = ["Name", dataContent[oneKey]["Name"], i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Base"]]
                //   }

                //   if (res2.length != 0 && res2[0].score > -15) {
                //       search_list[title] = ["Prompt", dataContent[oneKey]["Prompt"], i, dataContent[oneKey]["Scale"], dataContent[oneKey]["Base"]]
                //   }
                // }
            }
          }
        })
      }
    
      if (Object.keys(search_list).length === 2) {
        // throw error
        setOpenErr(true)
      } else if (Object.keys(search_list).length === 3) {
        // go straight to result
        setPrompt([Object.keys(search_list)[2], Object.values(search_list)[2]])
        setVal(search_list["val"])
        setType(Object.values(search_list)[2])
      } else {
        // display list
        setSearch(search_list)
        setOpen(true)
      }
  } 

    return(
        <div className="prompt">
            <div class="search">
              <label className="searchlabel">input thing to search</label>
              <input value={text} onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e)} className="searchprompt"/>
            </div>
                <DropdownMenu prompt={prompt} val={value} type={type} zombie={zombie}/>
                <Modal isOpen={open} className="styleModal2">
                <div>
                    {Object.keys(searchResult).map(function(key, index) {
                        if (key !== "input" && key !== "val") {
                          return <h6 className="unitList" 
                          onClick={() => closeErrModalContent(searchResult["val"], [Object.keys(searchResult)[index], Object.values(searchResult)[index]], searchResult[key][0])}>{key}</h6>
                        }
                    })}
                </div>
                <span className="errModalclose" onClick={() => setOpen(false)}>close.</span>
                </Modal>
                <Modal isOpen={openErr} className="styleModal">
                <div className="errModal">
                    No matches for your search.
                    <span className="errModalclose" onClick={() => setOpenErr(false)}>close.</span>
                </div>
                </Modal>
            </div>
    )

}

export default QUnit; 
