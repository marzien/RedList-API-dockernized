import React, { Component } from "react"

class Mammal extends Component {
  constructor(props) {
    super(props)
    this.state = { mammals: [] }
  }

  async componentDidMount() {
    const mammalsUrl =
      process.env.REACT_APP_API_COMPGROUP_URL +
      "mammals?token=" +
      process.env.REACT_APP_API_KEY
    const response = await fetch(mammalsUrl)
    const data = await response.json()
    this.setState({ mammals: data.result })
  }

  render() {
    return (
      <div>
        {this.state.mammals.map((mammal, i) => (
          <li key={i}>
            {i}: {mammal.scientific_name}
          </li>
        ))}
      </div>
    )
  }
}

export default Mammal
