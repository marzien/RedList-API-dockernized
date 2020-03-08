import React, { Component } from "react"
import { Table } from "react-bootstrap"

class CountryInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { species: [], loading: true, criticallyEndangered: {} }
  }

  async componentDidMount() {
    const speciesUrl =
      process.env.REACT_APP_API_SPECIES_URL +
      this.props.country +
      "?token=" +
      process.env.REACT_APP_API_KEY
    const response = await fetch(speciesUrl)
    const data = await response.json()
    this.setState({ species: data.result, loading: true, criticallyEndangered: {} })
  }

  async componentDidUpdate() {
    let criticallyEndangered = this.state.species.filter((animal) => {
      return animal.category === "CR"
    })

    let Arr = []
    criticallyEndangered.map(async (animal) => {
      const conservationUrl =
        process.env.REACT_APP_API_CONSERV_URL +
        animal.taxonid +
        "?token=" +
        process.env.REACT_APP_API_KEY

      const response = await fetch(conservationUrl)
      const data = await response.json()

      Arr.push(data.result)
    })
    // this.setState({
    //   species: this.state.species,
    //   loading: false,
    //   criticallyEndangered: Arr
    // })
    console.log(Arr)
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
                </tr>
              </thead>
              <tbody>
                {criticallyEndangeredTemp.map((animal, i) => (
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
