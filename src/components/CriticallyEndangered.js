import React, { Component } from "react"
import { Table } from "react-bootstrap"
import Spinner from "./Spinner"
import axios from "../axios/index"

class CriticallyEndangered extends Component {
  constructor(props) {
    super(props)
    this.state = { species: [], loading: true, CRresult: [] }
  }

  componentDidMount() {
    const API_KEY = process.env.REACT_APP_API_KEY
    axios
      .get(`species/region/${this.props.region}/page/0/?token=${API_KEY}`)
      .then((res) => {
        this.setState({ species: res.data.result, loading: true, CRresult: [] })
      })
      .catch((err) => `ERROR: can't get regions ${err}`)
  }

  componentDidUpdate(previousProps, previousState) {
    const API_KEY = process.env.REACT_APP_API_KEY
    let criticallyEndangered = this.state.species.filter((animal) => {
      return animal.category === "CR"
    })

    let CRArr = Promise.all(
      criticallyEndangered.map(async (animal) => {
        return axios
          .get(`measures/species/id/${animal.taxonid}?token=${API_KEY}`)
          .then((res) => {
            return {
              name: animal.scientific_name,
              conservation: res.data.result,
              category: animal.category
            }
          })
          .catch(
            (err) =>
              `ERROR: Can't get animal with ID: ${animal.taxonid} conservation: ${err}`
          )
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
    const { loading, species, CRresult } = this.state
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
                  <th>Conservation</th>
                </tr>
              </thead>
              <tbody>
                {CRresult.map((CRanimal, i) => (
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
