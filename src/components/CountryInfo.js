import React, { Component } from "react"

class CountryInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return <div>{this.props.country}</div>
  }
}

export default CountryInfo
