import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table } from "react-bootstrap"
require("dotenv").config()

class CountryList extends Component {
  constructor(props) {
    super(props)
    this.state = { countries: null, loading: true }
  }

  async componentDidMount() {
    const response = await fetch(
      process.env.REACT_APP_API_URL + process.env.REACT_APP_API_KEY
    )
    const data = await response.json()
    this.setState({ countries: data.results, loading: false })
  }

  handleClick = (e, data) => {
    // access to e.target here
    console.log(e.target.value, data)
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.countries ? (
          <div>Loading...</div>
        ) : (
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ISO code</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {this.state.countries.map((country, i) => (
                  <tr key={country.isocode}>
                    <td
                      value={country.isocode}
                      onClick={(e) => this.handleClick(e, country.isocode)}
                    >
                      {country.isocode}
                    </td>
                    <td
                      value={country.isocode}
                      onClick={(e) => this.handleClick(e, country.isocode)}
                    >
                      {country.country}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    )
  }
}

export default CountryList
