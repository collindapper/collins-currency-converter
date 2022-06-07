import React from 'react';
import { json, checkStatus } from './utils';
import Currencies from './currencies';
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './Footer';

class ExchangeRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversionAmount: 1,
      results: [],
      baseCurrency: 'USD',
      error: ''
    };

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleBaseCurrencyChange = this.handleBaseCurrencyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleAmountChange(event) {
    event.preventDefault();
    this.setState({ conversionAmount: event.target.value });
    this.handleSubmit(event);
  }



  handleBaseCurrencyChange(event) {
    event.preventDefault();
    let { conversionAmount, baseCurrency } = this.state;
    this.setState({ baseCurrency: event.target.value });

    if (!conversionAmount) {
      return;
    }

      fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${conversionAmount}&from=${baseCurrency}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          if (data.amount !== parseInt(conversionAmount)) {
            console.log('Error');
            throw new Error(data.Error);
          }

          if (data.amount === parseInt(conversionAmount) && data.rates) {
            console.log(data);
            this.setState({ results: data.rates, error: '' });
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
    let { conversionAmount, baseCurrency } = this.state;
    
    if (!conversionAmount) {
      return;
    }

      fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${conversionAmount}&from=${baseCurrency}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
          if (data.amount !== parseInt(conversionAmount)) {
            console.log('Error');
            throw new Error(data.Error);
          }

          if (data.amount === parseInt(conversionAmount)) {
            console.log(data);
            this.setState({ results: data.rates, error: '' });
          }
        })
        .catch((error) => {
          this.setState({ error: error.message });
          console.log(error);
        })
  }


  render() {
    const { conversionAmount, baseCurrency, results } = this.state;
    

    return (
      <div className="container mt-4">
        <div className="d-flex row exchangeRatesRow rounded shadow-lg">

          <p className="display-1 text-center my-auto fontPrimary">Exchange Rates</p>

          <form className="d-md-flex mt-4 mb-auto pb-2 justify-content-between border-bottom" onSubmit={this.handleSubmit}>

            <div className="col-10 col-md-5 mx-auto mx-md-4">
              <h4 className="mx-auto">Amount:</h4>
              <input className="d-flex form-control w-100 shadow" type="number" onChange={this.handleAmountChange} value={conversionAmount} placeholder="1"></input>
            </div>

            <div className="col-10 col-md-5 mx-auto mx-md-4 mt-4 mt-md-0">
              <h4 className="mx-auto">From:</h4>
              <select className="form-select shadow" onChange={this.handleBaseCurrencyChange} value={baseCurrency} aria-label="Default select example">
                {Currencies.options.map(currency => (
                    <option key={currency.name} value={currency.value}>
                      {currency.value} : {currency.name}
                    </option>
                  ))}
              </select>
            </div>

            <button type="submit" className="d-flex mx-auto btn btn-success mt-4 mt-md-auto shadow">Submit</button>
          </form>
          
          <div className="container exchangeContainer my-4 shadow">
              {Object.keys(results).map((symbols, index) => {
                return <div key={symbols} className="exchangeRatesResults text-center mt-2">{symbols}: {results[symbols]}</div>
              })}
          </div>
        </div>
      <Footer />
      </div>
    );
  }
}

export default ExchangeRates;