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
    this.setState({ species: data.result, loading: false })
  }

  render() {
    let criticallyEndangered = this.state.species.filter((animal) => {
      return animal.category === "CR"
      // TODO: fetch conservation measures
      // /api/v3/measures/species/name/:name/region/:region_identifier?token='YOUR TOKEN'
    })
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
                {criticallyEndangered.map((animal, i) => (
                  <tr key={animal.scientific_name}>
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
