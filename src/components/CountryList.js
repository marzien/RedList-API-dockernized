import React, { Component } from 'react';
require('dotenv').config()

class CountryList extends Component {
    constructor(props) {
        super(props);
        this.state = { countries: [] }
    }
    
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+process.env.REACT_APP_API_KEY)
          .then((res) => res.json())
          .then((res) => this.setState({ countries: res }))
          .catch(err => console.log(`Can't fetch countries: {err}`))
    }

    render() { 
        return (
            <table>
                <head>
                    <tr>
                        <td>iso code</td>
                        <td>Country</td>
                    </tr>
                </head>
                <tbody>
                    {this.state.countries.results &&
                    this.state.countries.results.map((country, i) => (
                        <tr key={country.isocode}>
                            <td>{country.isocode}</td>
                            <td>{country.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
 
export default CountryList;