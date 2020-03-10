import React, { Component } from "react"
import { Table } from "react-bootstrap"
import Spinner from "./Spinner"
import axios from "../axios/index"

class Mammal extends Component {
  constructor(props) {
    super(props)
    this.state = { mammals: [], loading: true }
  }

  componentDidMount() {
    const API_KEY = process.env.REACT_APP_API_KEY
    let getMammalIDs = () => {
      return axios
        .get(`comp-group/getspecies/mammals?token=${API_KEY}`)
        .then((res) => {
          return res.data.result.map((mammal) => mammal.taxonid)
        })
        .catch((err) => `ERROR: can't get mammals ids ${err}`)
    }

    let getSpecies = () => {
      return axios
        .get(`species/region/${this.props.region}/page/0/?token=${API_KEY}`)
        .then((res) => {
          return res.data.result
        })
        .catch((err) => `ERROR: can't get species by region ${err}`)
    }

    Promise.all([getMammalIDs(), getSpecies()])
      .then(([mamalIDs, spieces]) => {
        let mammalsInRegion = spieces.filter((animal) => {
          return mamalIDs.includes(animal.taxonid)
        })
        return mammalsInRegion
      })
      .then((mammals) => {
        this.setState({
          mammals,
          loading: false
        })
      })
      .catch((err) => console.log(`ERROR: can't filer only mammals ${err}`))
  }

  render() {
    const { loading, mammals } = this.state
    return (
      <div>
        {loading || !mammals ? (
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
                {mammals.map((mammal) => (
                  <tr key={mammal.taxonid}>
                    <td>{mammal.scientific_name}</td>
                    <td>{mammal.category}</td>
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

export default Mammal
