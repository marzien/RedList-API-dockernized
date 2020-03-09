import React, { Component } from "react"
import { Table } from "react-bootstrap"

class CountryInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { species: [], loading: true, CRresult: [] }
  }

  async componentDidMount() {
    const speciesUrl =
      process.env.REACT_APP_API_SPECIES_URL +
      this.props.region +
      "/page/" +
      "0" +
      "?token=" +
      process.env.REACT_APP_API_KEY
    const response = await fetch(speciesUrl)
    const data = await response.json()
    this.setState({ species: data.result, loading: false, CRresult: [] })
  }

  render() {
    return (
      <div>
        {this.state.loading || !this.state.species ? (
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
                {this.state.species.map((animal) => (
                  <tr key={animal.taxonid}>
                    <td>{animal.scientific_name}</td>
                    <td>{animal.category}</td>
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
