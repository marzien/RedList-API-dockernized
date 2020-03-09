import React, { Component } from "react"
import { Table } from "react-bootstrap"

class CriticallyEndangered extends Component {
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
    this.setState({ species: data.result, loading: true, CRresult: [] })
  }

  async componentDidUpdate(previousProps, previousState) {
    let criticallyEndangered = this.state.species.filter((animal) => {
      return animal.category === "CR"
    })

    let CRArr = Promise.all(
      criticallyEndangered.map(async (animal) => {
        const conservationUrl =
          process.env.REACT_APP_API_CONSERV_URL +
          animal.taxonid +
          "?token=" +
          process.env.REACT_APP_API_KEY

        const response = await fetch(conservationUrl)
        const data = await response.json()
        return {
          name: animal.scientific_name,
          conservation: data.result,
          category: animal.category
        }
      })
    )
      .then((data) => {
        return data
      })
      .catch((err) => console.log(`ERROR: Can't get conservation data: ${err}`))

    CRArr.then((CRdata) => {
      if (previousState.CRresult !== this.state.CRresult) {
        this.setState({
          species: this.state.species,
          loading: false,
          CRresult: CRdata
        })
      }
    }).catch((err) => console.log(`ERROR: Can't update state: ${err}`))
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
                  <th>Conservation</th>
                </tr>
              </thead>
              <tbody>
                {this.state.CRresult.map((CRanimal, i) => (
                  <tr key={CRanimal.name}>
                    <td>{CRanimal.name}</td>
                    <td>{CRanimal.category}</td>
                    <td>
                      {CRanimal.conservation.map((cons, i) => (
                        <p key={cons.code}>
                          {cons.code}: {cons.title}
                        </p>
                      ))}
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

export default CriticallyEndangered
