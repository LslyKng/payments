import React, { Component } from "react";
import Button from "./Button";
import "./CalcPayment.css";
import Balance from "./Balance";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      selectedCurrency: "USD",
      amount: 0
    };
  }

  getConversions() {
    fetch("https://exchangeratesapi.io/api/latest?base=GBP")
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[this.state.alternateCurrency];
        const total = this.props.total;
        this.setState({
          alternateBalance: (rate * total).toFixed(2)
        });
      });
  }

  componentDidMount() {
    this.getConversions();
  }

  selectCurrency = event => {
    const currency = event.target.value;
    this.setState({
      selectedCurrency: currency
    });
    this.getConversions();
  };

  render() {
    return (
      <div className="CalcPayment">
        <h2 className="CalcPayment-label">Calculate Payment in GBP</h2>
        <div className="CalcPayment-control">
          <select
            onChange={this.selectCurrency}
            defaultValue={this.state.selectedCurrency}
          >
            {this.props.currencies.map((currency, index) => (
              <option key={index}>{currency}</option>
            ))}
          </select>
          <input
            className="CalcPayment-amount"
            type="text"
            defaultValue="0.00"
          />
          is worth <span className="CalcPayment-result">???</span> in GBP.
          <div className="CalcPayment-calculate">
            <Button>Calculate</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
