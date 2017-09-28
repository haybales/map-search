import React, { Component } from 'react';
import MapView from './MapView';
import SearchBox from './SearchBox'

class App extends Component {
  constructor(props){

    super(props);
    this.handleNewResults=this.handleNewResults.bind(this);
    this.getPan=this.getPan.bind(this);
    this.state={
      results: [],
      location: [54.18815548107151, -7.657470703124999],
      pan: null
    }
  }

  handleNewResults(res, location){
    this.setState({
      results: res,
      location: location
    });
    console.log("app results updated.")
  }

  getPan(pan){
    this.setState({pan: pan});
  }

  render() {
    return (
      <div className="wrapper">
        <MapView results={this.state.results} location={this.state.location} assignPan={this.getPan}/>
        <SearchBox resulthandler={this.handleNewResults} thePan={this.state.pan}/>
      </div>
    );
  }


}
export default App;
