import './Currency.css'
import React from "react";
import TextField from "@material-ui/core/TextField";

function Currency(props) {
    const selectedCurrency = props.selectedCurrency
    const onChangeCurrency = props.onChangeCurrency
    const onChangeAmount = props.onChangeAmount
    const amount = props.amount
    const type = props.type
    let currencyOptions = props.currencyOptions

    console.log(currencyOptions)
    if (currencyOptions != undefined) {
        console.log(JSON.parse(currencyOptions))
        currencyOptions = JSON.parse(currencyOptions)
    }
    console.log(typeof currencyOptions)

    function parseType() {
        let currency = <h6>loading...</h6>
        if (currencyOptions != undefined) {
        // eslint-disable-next-line default-case
        switch(type) {
            case "from": 
                currency = <div className="currencyRow">
                                <div className="currencyCol">
                                    <h5 className="currencyTitle">Amount</h5>
                                    <TextField label = "from" className="currencyPrompt" type="number" 
                                        value={amount} onChange={onChangeAmount}/>
                                </div>

                                <div className="currencyCol">
                                    <h5 className="currencyTitle">From</h5>
                                    <select value={selectedCurrency} onChange={onChangeCurrency} className="option" id="from-drop">
                                        {Object.keys(currencyOptions["symbols"]).map(option => {
                                            if (option == "USD") {
                                                return <option key={option} selected="selected" value={option}>{option} - {currencyOptions["symbols"][option]}</option>
                                            } else {
                                                return <option key={option} value={option}>{option} - {currencyOptions["symbols"][option]}</option>
                                            }
                                        })}
                                </select>
                                </div>
                            </div>
                break;
            case "to": 
                currency = <div className="currencyCol">
                                <h5 className="currencyTitle">To</h5>
                                <select value={selectedCurrency} onChange={onChangeCurrency} className="option">
                                    {Object.keys(currencyOptions["symbols"]).map(option => {
                                        if (option == "EUR") {
                                            return <option key={option} selected="selected" value={option}>{option} - {currencyOptions["symbols"][option]}</option>
                                        } else {
                                            return <option key={option} value={option}>{option} - {currencyOptions["symbols"][option]}</option>
                                        }
                                    })}
                                </select>
                            </div>
                break;
        }
        }
        return currency
    }

    return (
        <div>
            {parseType()}
        </div>
    )
}

export default Currency