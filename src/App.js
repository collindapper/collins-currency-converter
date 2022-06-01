import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CurrencyConverter from './CurrencyConverter';
import ExchangeRates from './ExchangeRates';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark">

        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><h2>Xchange</h2></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-md-auto me-md-4">
              <li className="nav-item">
                <Link className="navCurrencyConverter" to="/">Currency Converter</Link>
              </li>
              <li className="nav-item mt-2 mt-md-0">
                <Link className="navExchangeRates ms-md-4" to="/exchange-rates/">Exchange Rates</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Switch>
        <Route path="/" exact component={CurrencyConverter} />
        <Route path="/exchange-rates/" component={ExchangeRates} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
