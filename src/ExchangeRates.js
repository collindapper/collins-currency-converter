import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';
import 'bootstrap/dist/css/bootstrap.css';

const Rates = (props) => {
  const {
    Amount,
    Base,
    Date,
    Rates,
  } = props.rates;

  return (
    <div className="row">
      <p className="display-4">Output:</p>
      <Link to={`/${Base}/`}>
        <h1>{Rates}</h1>
      </Link>
    </div>
  )
}

class ExchangeRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      results: [],
      fromCurrency: '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ amount: event.target.value, fromCurrency: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { amount, fromCurrency, toCurrency } = this.state;
    amount = amount.trim();
    if (!amount) {
      return;
    }

    fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.Reponse === 'False') {
          throw new Error(data.Error);
        }

        if (data.Response === 'True' && data.Search) {
          console.log(data);
          this.setState({ results: data.Search, error: '' });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
  }


  render() {
    const { amount, results, fromCurrency, error } = this.state;

    return (
      <div className="container mt-4">
        <div className="d-flex row rounded shadow">

          <p className="display-2 text-center">Exchange Rates</p>

          <form className="d-md-flex mt-4 mb-4 justify-content-between" onSubmit={this.handleSubmit}>

            <div className="col-10 col-md-5 mx-auto mx-md-4">
              <h4 className="mx-auto">Amount:</h4>
              <input className="d-flex form-control w-100" type="number" onChange={this.handleChange} value={amount} placeholder="1"></input>
            </div>

            <div className="col-10 col-md-5 mx-auto mx-md-4 mt-4 mt-md-0">
              <h4 className="mx-auto">From:</h4>
              <select className="form-select" aria-label="Default select example">
                <option default>Choose Currency</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>AUD</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>BGN</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>BRL</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>CAD</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>CHF</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>CNY</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>CZK</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>DKK</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>EUR</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>GBP</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>HKD</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>HRK</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>HUF</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>IDR</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>ILS</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>INR</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>ISK</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>JPY</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>KRW</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>MXN</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>MYR</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>NOK</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>NZD</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>PHP</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>PLN</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>RON</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>RUB</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>SEK</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>SGD</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>THB</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>TRY</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>USD</option>
                <option onChange={this.handleChange} name="fromCurrency" value={fromCurrency}>ZAR</option>
              </select>
            </div>

            <button type="submit" className="d-flex mx-auto btn btn-success mt-4 mt-md-auto">Submit</button>
          </form>
        </div>
        {(() => {
          if (error) {
            return error;
          }
          return results.map((rates) => {
            return <Rates key={rates.Base} amount={amount} />
          })
        })()}
      </div>
    );
  }
}

export default ExchangeRates;