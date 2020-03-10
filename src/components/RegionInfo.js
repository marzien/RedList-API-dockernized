import React, { Component } from "react"
import { Table } from "react-bootstrap"
import Spinner from "./Spinner"
import axios from "../axios/index"

class CountryInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { species: [], loading: true }
  }

  componentDidMount() {
    const API_KEY = process.env.REACT_APP_API_KEY
    axios
      .get(`species/region/${this.props.region}/page/0/?token=${API_KEY}`)
      .then((res) => {
        this.setState({ species: res.data.result, loading: false })
      })
      .catch((err) => `ERROR: can't get species by region ${err}`)
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
