import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table, Button } from "react-bootstrap"
import RegionInfo from "./RegionInfo"
import CriticallyEndagered from "./CriticallyEndangered"
import Mammal from "./Mammal"
import Spinner from "./Spinner"
import axios from "../axios/index"

class CountryList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      regions: null,
      loading: true,
      region: "",
      regionEndangered: "",
      regionMammal: ""
    }
  }

  componentDidMount() {
    const API_KEY = process.env.REACT_APP_API_KEY
    axios
      .get(`region/list?token=${API_KEY}`)
      .then((res) => {
        this.setState({
          regions: res.data.results,
          loading: false,
          region: "",
          regionEndangered: "",
          regionMammal: ""
        })
      })
      .catch((err) => `ERROR: can't get regions ${err}`)
  }

  handleClickAll = (e, data) => {
    this.setState({
      regions: this.state.regions,
      loading: false,
      region: data,
      regionEndangered: "",
      regionMammal: ""
    })
  }

  handleClickEndangered = (e, data) => {
    this.setState({
      regions: this.state.regions,
      loading: false,
      region: "",
      regionEndangered: data,
      regionMammal: ""
    })
  }

  handleClickMammals = (e, data) => {
    this.setState({
      regions: this.state.regions,
      loading: false,
      region: "",
      regionEndangered: "",
      regionMammal: data
    })
  }

  render() {
    const { loading, regions, region, regionEndangered, regionMammal } = this.state
    return (
      <div>
        {loading && !regions ? (
          <Spinner />
        ) : region ? (
          <div>
            <h1>Region name: {region}</h1>
            <RegionInfo region={region} />
          </div>
        ) : regionEndangered ? (
          <div>
            <h1>Region name: {regionEndangered}</h1>
            <CriticallyEndagered region={regionEndangered} />
          </div>
        ) : regionMammal ? (
          <div>
            <h1>Region name: {regionMammal}</h1>
            <Mammal region={regionMammal} />
          </div>
        ) : (
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>All Species</th>
                  <th>Critically Endangered</th>
                  <th>Only mammals</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((regions, i) => (
                  <tr key={regions.identifier}>
                    <td>{regions.name}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        value={regions.indentifier}
                        onClick={(e) => this.handleClickAll(e, regions.identifier)}
                      >
                        Info
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        value={regions.indentifier}
                        onClick={(e) =>
                          this.handleClickEndangered(e, regions.identifier)
                        }
                      >
                        Species
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        value={regions.indentifier}
                        onClick={(e) =>
                          this.handleClickMammals(e, regions.identifier)
                        }
                      >
                        Species
                      </Button>
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

export default CountryList
