import React, { Component } from "react"
import { Table } from "react-bootstrap"

class CountryInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { species: [], loading: true, conservation: [] }
  }

  async componentDidMount() {
    const speciesUrl =
      process.env.REACT_APP_API_SPECIES_URL +
      this.props.country +
      "?token=" +
      process.env.REACT_APP_API_KEY
    const response = await fetch(speciesUrl)
    const data = await response.json()
    this.setState({ species: data.result, loading: true, conservation: [] })
  }

  async componentDidUpdate(previousProps, previousState) {
    let criticallyEndangered = this.state.species.filter((animal) => {
      return animal.category === "CR"
    })

    let resArr = Promise.all(
      criticallyEndangered.map(async (animal) => {
        const conservationUrl =
          process.env.REACT_APP_API_CONSERV_URL +
          animal.taxonid +
          "?token=" +
          process.env.REACT_APP_API_KEY

        const response = await fetch(conservationUrl)
        const data = await response.json()

        return data.result
      })
    )
      .then((data) => {
        return data
      })
      .catch((err) => console.log(`ERROR: Can't get conservation data: {err}`))

    resArr.then((conservationCR) => {
      if (previousState.conservation !== this.state.conservation) {
        this.setState({
          species: this.state.species,
          loading: false,
          conservation: conservationCR
        })
      }
    })
  }

  render() {
    let criticallyEndangeredTemp = this.state.species.filter((animal) => {
      return animal.category === "CR"
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
                  <th>Conservation</th>
                </tr>
              </thead>
              <tbody>
                {criticallyEndangeredTemp.map((animal, i) => (
                  <tr key={animal.scientific_name}>
                    <td>{animal.scientific_name}</td>
                    <td>{animal.category}</td>
                    <td>---</td>
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
