import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table } from "react-bootstrap"
require("dotenv").config()

class CountryList extends Component {
  constructor(props) {
    super(props)
    this.state = { countries: [] }
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_API_KEY)
      .then((res) => res.json())
      .then((res) => this.setState({ countries: res }))
      .catch((err) => console.log(`Can't fetch countries: {err}`))
  }

  render() {
    return (
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ISO code</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {this.state.countries.results &&
              this.state.countries.results.map((country, i) => (
                <tr key={country.isocode}>
                  <td>{country.isocode}</td>
                  <td>{country.country}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default CountryList
