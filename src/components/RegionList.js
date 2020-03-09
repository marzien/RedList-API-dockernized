import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table, Button } from "react-bootstrap"
import RegionInfo from "./RegionInfo"
import CriticallyEndagered from "./CriticallyEndangered"
import Mammal from "./Mammal"

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

  async componentDidMount() {
    const regionsUrl =
      process.env.REACT_APP_API_REGIONS_URL + process.env.REACT_APP_API_KEY
    const response = await fetch(regionsUrl)
    const data = await response.json()
    this.setState({
      regions: data.results,
      loading: false,
      region: "",
      regionEndangered: "",
      regionMammal: ""
    })
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
    return (
      <div>
        {this.state.loading && !this.state.regions ? (
          <div>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div>Loading...</div>
          </div>
        ) : this.state.region ? (
          <div>
            <h1>Region name: {this.state.region}</h1>
            <RegionInfo region={this.state.region} />
          </div>
        ) : this.state.regionEndangered ? (
          <div>
            <h1>Region name: {this.state.regionEndangered}</h1>
            <CriticallyEndagered region={this.state.regionEndangered} />
          </div>
        ) : this.state.regionMammal ? (
          <div>
            <h1>Region name: {this.state.regionMammal}</h1>
            <Mammal region={this.state.regionMammal} />
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
                {this.state.regions.map((regions, i) => (
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
