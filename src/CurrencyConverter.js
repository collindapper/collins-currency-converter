import React, { useState } from 'react';
import Currencies from './currencies';
import { json, checkStatus } from './utils';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './Footer';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversionAmount: 1,
      results: [],
      baseCurrency: 'USD',
      convertedCurrency: 'EUR',
      error: '',
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleBaseCurrencyChange = this.handleBaseCurrencyChange.bind(this);
    this.handleConvertedCurrencyChange = this.handleConvertedCurrencyChange.bind(this);
    this.handleSwitchCurrency = this.handleSwitchCurrency.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  handleAmountChange(event) {
    event.preventDefault();
    this.setState({ conversionAmount: event.target.value });
  }



  handleBaseCurrencyChange(event) {
    event.preventDefault();
    let { conversionAmount, baseCurrency, convertedCurrency } = this.state;
    this.setState({ baseCurrency: event.target.value });

    if (!conversionAmount) {
      return;
    }

      fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${conversionAmount}&from=${baseCurrency}&to=${convertedCurrency}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          if (data.amount != parseInt(conversionAmount)) {
            console.log('Error');
            throw new Error(data.Error);
          }

          if (data.amount === parseInt(conversionAmount) && data.rates) {
            console.log(data);
            this.setState({ results: data.rates, error: '', symbol: convertedCurrency });
            this.handleSubmit(event);
          }
        })
        .catch((error) => {
          this.setState({ error: error.message });
          console.log(error);
        })
  }



  handleConvertedCurrencyChange(event) {
    event.preventDefault();
    let { conversionAmount, baseCurrency, convertedCurrency } = this.state;
    this.setState({ convertedCurrency: event.target.value });

    if (!conversionAmount) {
      return;
    }

      fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${conversionAmount}&from=${baseCurrency}&to=${convertedCurrency}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          if (data.amount != parseInt(conversionAmount)) {
            console.log('Error');
            throw new Error(data.Error);
          }

          if (data.amount === parseInt(conversionAmount) && data.rates) {
            console.log(data);
            this.setState({ results: data.rates, error: '', symbol: convertedCurrency });
            this.handleSubmit(event);
          }
        })
        .catch((error) => {
          this.setState({ error: error.message });
          console.log(error);
        })
  }



  handleSwitchCurrency(event) {
    event.preventDefault();
    let { conversionAmount, baseCurrency, convertedCurrency } = this.state;
    this.setState({ baseCurrency: convertedCurrency, convertedCurrency: baseCurrency });

    if (!conversionAmount) {
      return;
    }

      fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${conversionAmount}&from=${baseCurrency}&to=${convertedCurrency}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          if (data.amount != parseInt(conversionAmount)) {
            console.log('Error');
            throw new Error(data.Error);
          }

          if (data.amount === parseInt(conversionAmount) && data.rates) {
            console.log(data);
            this.setState({ results: data.rates, error: '', symbol: convertedCurrency });
            this.handleSubmit(event);
          }
        })
        .catch((error) => {
          this.setState({ error: error.message });
          console.log(error);
        })
  }



  handleSubmit(event) {
    event.preventDefault();
    let { conversionAmount, baseCurrency, convertedCurrency } = this.state;
    
    if (!conversionAmount) {
      return;
    }

      fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${conversionAmount}&from=${baseCurrency}&to=${convertedCurrency}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          if (data.amount != parseInt(conversionAmount)) {
            console.log('Error');
            throw new Error(data.Error);
          }

          if (data.amount === parseInt(conversionAmount) && data.rates) {
            console.log(data);
            this.setState({ results: data.rates, error: '', symbol: convertedCurrency });
            
          }
        })
        .catch((error) => {
          this.setState({ error: error.message });
          console.log(error);
        })
  }

  

  render() {
    const { conversionAmount, results, baseCurrency, convertedCurrency, symbol } = this.state;
    

    return (
      <div className="container mt-4">
        <div className="d-flex row currencyConverterRow rounded shadow-lg">

          <p className="display-1 text-center my-auto fontPrimary">Currency Converter</p>

          <form className="d-md-flex mb-auto pb-2 justify-content-between border-bottom" onSubmit={this.handleSubmit}>

            <div className="col-10 col-md-3 mx-auto mx-md-4">
              <h4 className="mx-auto">Amount:</h4>
              <input className="d-flex form-control w-100 shadow" type="number" onChange={this.handleAmountChange} value={conversionAmount} placeholder="Enter Amount" required></input>
            </div>

            <div className="col-10 col-md-3 mx-auto mx-md-4 mt-4 mt-md-0">
              <h4 className="mx-auto">From:</h4>
              <select className="form-select shadow" onChange={this.handleBaseCurrencyChange} value={baseCurrency} aria-label="Default select example">
                {Currencies.options.map(currency => (
                  <option key={currency.name} value={currency.value}>
                    {currency.value} : {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" onClick={this.handleSwitchCurrency} className="d-none d-md-flex mx-auto btn btn-primary mt-4 mt-md-auto mb-md-1 shadow"><i className="fa-solid fa-arrow-right-arrow-left"></i></button>
            <button type="button" onClick={this.handleSwitchCurrency} className="d-flex d-md-none mx-auto btn btn-primary shadow mt-4 mt-md-auto mb-md-1 shadow"><i className="fa-solid fa-arrow-right-arrow-left switchButtonMobile"></i></button>

            <div className="col-10 col-md-3 mx-auto mx-md-4 mt-md-0">
              <h4 className="mx-auto">To:</h4>
              <select className="form-control shadow" onChange={this.handleConvertedCurrencyChange} value={convertedCurrency} aria-label="Default select example">
                {Currencies.options.map(currency => (
                  <option key={currency.name} value={currency.value}>
                    {currency.value} : {currency.name}
                  </option>
                ))}
              </select>
            </div>
              <button type="submit" className="d-flex mx-auto btn btn-primary  shadow mt-4 mt-md-auto">Submit</button>
          </form>
          <div className="shadow-lg mb-auto">
          <div className="col-5 mx-auto">
            <h5 className="display-5 fontPrimary">{conversionAmount} {baseCurrency} =</h5>
          </div>
          <div className="col-8 mx-auto text-center fontPrimary">
            <h3 className="display-2">{results[symbol]} {convertedCurrency} </h3>
          </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CurrencyConverter;