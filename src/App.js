import React from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import RegionList from "./components/RegionList"
import Header from "./components/Header"
import Mammal from "./components/Mammal"

function App() {
  return (
    <div className="App">
      <Header />
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
