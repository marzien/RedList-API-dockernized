import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table, Button } from "react-bootstrap"
import RegionInfo from "./RegionInfo"
import CriticallyEndagered from "./CriticallyEndangered"

class CountryList extends Component {
  constructor(props) {
    super(props)
    this.state = { regions: null, loading: true, regionInfo: "" }
  }

  async componentDidMount() {
    const regionsUrl =
      process.env.REACT_APP_API_REGIONS_URL + process.env.REACT_APP_API_KEY
    const response = await fetch(regionsUrl)
    const data = await response.json()
    this.setState({
      regions: data.results,
      loading: false,
      regionInfo: "",
      endangered: ""
    })
  }

  handleClickAll = (e, data) => {
    this.setState({
      regions: this.state.regions,
      loading: false,
      regionInfo: data,
      endangered: ""
    })
  }

  handleClickEndangered = (e, data) => {
    console.log(data)
    this.setState({
      regions: this.state.regions,
      loading: false,
      regionInfo: "",
      endangered: data
    })
  }

  render() {
    return (
      <div>
        {this.state.loading && !this.state.regions ? (
          <div>Loading...</div>
        ) : this.state.regionInfo ? (
          <div>
            <h1>Region name: {this.state.regionInfo} (ISO standard)</h1>
            <RegionInfo region={this.state.regionInfo} />
          </div>
        ) : this.state.endangered ? (
          <div>
            <h1>Region name: {this.state.regionInfo} (ISO standard)</h1>
            <CriticallyEndagered region={this.state.endangered} />
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
                      <Button variant="outline-danger" size="sm">
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
