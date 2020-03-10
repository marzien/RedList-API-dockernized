import React, { Component } from "react"
import { Table } from "react-bootstrap"
import Spinner from "./Spinner"

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
    const { loading, species } = this.state
    return (
      <div>
        {loading || !species ? (
          <Spinner />
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
                {species.map((animal) => (
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
