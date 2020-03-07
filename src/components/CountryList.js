import React, { Component } from 'react';
require('dotenv').config()

class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = { country: [] }
    }
    
    // componentDidMount() {
    //     fetch("/api/parser")
    //       .then((res) => res.json())
    //       .then((res) => this.setState({ country: res })
    // }

    render() { 
        return (
            <div>
                <div>Hello from Country List</div>
                <h1>{process.env.REACT_APP_API_URL}</h1>
                <h1>{process.env.REACT_APP_API_KEY}</h1>
            </div>
        );
    }
}
 
export default CountryList;