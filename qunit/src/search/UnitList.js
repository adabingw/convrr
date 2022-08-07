// import './UnitList.css'
// import React from 'react'
// import { useState } from 'react'
// import UnitItem from './UnitItem'

// let data = require('../data/units.json');

// function UnitList(props) {
//     let title = props.title; 
//     let index = props.index; 

//     // focus indicates the current active unit
//     // scale indicates the current active unit's scale
//     // list indicates the list of units
//     const [focus, setFocus] = useState(0); 
//     const [scale, setScale] = useState(1);
//     const [list, setList] = useState(changeList(0))

    
//     // parses the objects of currently selected unit and sets it to list
//     function changeSelectedItem() {
//         let dataContent = []
//         dataContent = data[title[index]]
    
//         let unitListComponents = []

//         Object.keys(dataContent).map((oneKey) => {
//           if (oneKey != "id") {
//             unitListComponents.push(<UnitItem name={dataContent[oneKey]["Name"]} 
//                 prompt={dataContent[oneKey]["Prompt"]} 
//                 scale={dataContent[oneKey]["Scale"]} 
//                 base={dataContent[oneKey]["Base"]} 
//                 order={dataContent[oneKey]["Order"]} 
//                 onchange={() => setFocus(index)}
//                 // we convert when onfocus/onKeyPress
//                 onBlur={() => convert(dataContent[oneKey]["Scale"], index)}
//                 onKeyPress={() => handleKeyPress()}
//                 />);
//           }
//         })
//         setList(unitListComponents)
//         console.log(list)
//     }

//     function convert() {
//         let dataContent = []
//         dataContent = data[title[index]]

//         Object.keys(dataContent).map((oneKey, index) => {
//             let unitListComponents = []
//             if (oneKey != "id") {
//               unitListComponents.push(<UnitItem name={dataContent[oneKey]["Name"]} 
//                   prompt={dataContent[oneKey]["Prompt"]} 
//                   scale={dataContent[oneKey]["Scale"]} 
//                   base={dataContent[oneKey]["Base"]} 
//                   order={dataContent[oneKey]["Order"]} 
//                   onchange={() => setFocus(index)}
//                   // we convert when onfocus/onKeyPress
//                   onBlur={() => convert(dataContent[oneKey]["Scale"], index)}
//                   onKeyPress={() => handleKeyPress()}
//                   />);
//             }
//           })
//     }

//     function handleKeyPress(event) {
//         if(event.key === 'Enter'){
//             convert()
//         }
//     }
    
//     // change list of units
//     function changeList(index) {
//         unitListComponents = []
//         dataContent = data[props.dataTitles[index]]
//         Object.keys(dataContent).map((oneKey, index) => {
//           if (oneKey != "id") {
//             unitListComponents.push(<UnitItem name={dataContent[oneKey]["Name"]} 
//                 prompt={dataContent[oneKey]["Prompt"]} 
//                 scale={dataContent[oneKey]["Scale"]} 
//                 base={dataContent[oneKey]["Base"]} 
//                 order={dataContent[oneKey]["Order"]} 
//                 onchange={() => setFocus(index)}
//                 // we convert when onfocus/onKeyPress
//                 onBlur={() => convert(dataContent[oneKey]["Scale"], index)}
//                 onKeyPress={() => handleKeyPress()}
//                 />);
//           }
//         })
//         return unitListComponents;
//     }

//     // change focus when we thing is implemented
//     function changeFocus(index) {
//         setFocus(index)

//         let dataContent = []
//         dataContent = data[props.dataTitles[index]]
    
//         let unitListComponents = []
//         Object.keys(dataContent).map((oneKey) => {
//           if (oneKey != "id") {
//             unitListComponents.push(<UnitItem name={dataContent[oneKey]["Name"]} 
//                 prompt={dataContent[oneKey]["Prompt"]} 
//                 scale={dataContent[oneKey]["Scale"]} 
//                 base={dataContent[oneKey]["Base"]} 
//                 order={dataContent[oneKey]["Order"]} />);
//           }
//         })
//     }

//     return (
//         <div>
//           { list.map((item) =>  {
//             return item;
//           })}
//         </div>
//     )

// }

// export default UnitList;