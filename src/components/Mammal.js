import React, { Component } from "react"

class Mammal extends Component {
  constructor(props) {
    super(props)
    this.state = { mammals: [], loading: true }
  }

  async componentDidMount() {
    let getMammalIDs = async () => {
      const mammalsUrl =
        process.env.REACT_APP_API_COMPGROUP_URL +
        "mammals?token=" +
        process.env.REACT_APP_API_KEY
      const mammalResponse = await fetch(mammalsUrl)
      const mammalData = await mammalResponse.json()
      return mammalData.result.map((mammal) => mammal.taxonid)
    }

    let getSpecies = async () => {
      const speciesUrl =
        process.env.REACT_APP_API_SPECIES_URL +
        this.props.region +
        "/page/" +
        "0" +
        "?token=" +
        process.env.REACT_APP_API_KEY
      const response = await fetch(speciesUrl)
      const speciesData = await response.json()
      return speciesData.result
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
      .catch((err) => console.log(`ERROR: ${err}`))
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
