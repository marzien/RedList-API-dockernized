import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import RegionList from "./components/RegionList"
import NavBar from "./components/NavBar"
import Mammal from "./components/Mammal"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={RegionList} />
          <Route path="/mammal" component={Mammal} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
