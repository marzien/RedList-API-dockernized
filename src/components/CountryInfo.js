import React, { Component } from "react"
import { Table } from "react-bootstrap"

class CountryInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { species: [], loading: false }
  }

  async componentDidMount() {
    const speciesUrl =
      process.env.REACT_APP_API_SPECIES_URL +
      this.props.country +
      "?token=" +
      process.env.REACT_APP_API_KEY
    const response = await fetch(speciesUrl)
    const data = await response.json()
    // console.log(data)
    this.setState({ species: data.result, loading: false })
  }

  render() {
    console.log(this.state.species)
    return (
      //   <div>test</div>
      <div>
        {this.state.loading && !this.state.species ? (
          <div>Loading...</div>
        ) : (
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Scientific Name</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {this.state.species.map((country, i) => (
                  <tr key={country.scientific_name}>
                    <td>{country.scientific_name}</td>
                    <td>{country.category}</td>
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

export default CountryInfo
