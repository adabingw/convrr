import './UnitItem.css'
import React from 'react'
import { useState } from 'react'
import TextField from "@mui/material/TextField"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

function UnitItem(props) {
    //  {"Name": "Meters", "Prompt": "m", "Scale": "1", "Base": "0", "Order": "10"},
    let name = props.name; 
    let prompt = props.prompt; 
    let scale = props.scale; 
    let base = props.base; 
    let order = props.order;

    console.log(name, prompt, scale, base, order)

    return(
        <div className="flexUnit">
            <Container>
                <Row>
                <Col xs={6} className="unit">
                    <p id="unitname">{name}</p>
                </Col>
                <Col xs={6} className="val">
                    <input type="text" name="name" placeholder={scale} id="textfield" 
                    onChange={props.onChange} onBlur={props.onBlur} onKeyDown={props.onKeyPress}/>
                </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UnitItem;