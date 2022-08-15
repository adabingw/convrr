import './QCurrency.css'
import { useState, useEffect } from "react";
import React from "react";
import Currency from './Currency.js'
import Modal from 'react-modal';

function QCurrency() {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "T2muUV9sbMUtcRJKaNwOpVZAXlt0Mof0");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    // list of all abbrev and names of currency
    const [currencyOptions, setCurrencyOptions] = useState(undefined)
    // selected from currency
    const [fromCurrency, setFromCurrency] = useState("USD")
    // selected to currency
    const [toCurrency, setToCurrency] = useState("EUR")
    // amount entered in
    const [amount, setAmount] = useState()
    // calculated result
    const [resultAmount, setResultAmount] = useState(0)
    // current date
    const [date, setDate] = useState(0)
    // exchange rate
    const [rate, setRate] = useState(1)
    // button pressed?
    const [status, setStatus] = useState(false)
    const [open, setOpen] = useState(false)
    const [openLoad, setOpenLoad] = useState(false)

    // gets list of all currency abbrevs and names
    useEffect(() => {
        fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                setCurrencyOptions(result)
            })
            .catch(error => console.log('error', error));
    }, [])

    function convert() {
        console.log("toCurrency: ", toCurrency)
        console.log("fromCurrency: ", fromCurrency)
        console.log("amount: ", amount)
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
            .then(res => res.text())
            .then(data => {
                setOpenLoad(false)
                console.log(data)
                let dataJson = JSON.parse(data)
                let result = dataJson["result"]
                let date = dataJson["date"]
                let rate = dataJson["info"]["rate"]
                console.log("result: ", result)
                console.log("date: ", date)
                setResultAmount(result)
                setDate(date)
                setRate(rate)
                setOpen(true)
            })
    }
    
    function handleFromAmountChange(e) {
        setAmount(e.target.value)
    }

    return (
        <div className="currency">
            <Currency
                type="from"
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={amount}
            />
            <div className="point">
                👇
            </div>
            <Currency
                type="to"
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                amount={resultAmount}
            />

            <h4 className="convert"
            onClick={()=> {
                setStatus(!status)
                console.log("convert pressed")
                setOpenLoad(true)
                convert()
            }}>CONVERT</h4>
            <Modal isOpen={open} className="styleModal">
                <div className="errModal">
                    <h6>{amount} {toCurrency}</h6>
                    <h6>{date}</h6>
                    <h6>rate: {rate}</h6>
                    <span className="errModalclose" onClick={() => setOpen(false)}>close.</span>
                </div>
            </Modal>
            <Modal isOpen={openLoad} className="styleModal">
                <div className="errModal">
                    Loading...
                </div>
            </Modal>
        </div>
    )
}

export default QCurrency