import React, { Component } from 'react';
import MapView from './MapView';
import SearchBox from './SearchBox'

class App extends Component {
  constructor(props){

    super(props);
    this.handleNewResults=this.handleNewResults.bind(this);
    this.getPan=this.getPan.bind(this);
    this.setFocus=this.setFocus.bind(this);

    var lat=37.7749;
    var lon=-122.4194;

    this.state={
      results: [],
      location: [lat, lon],
      pan: null,
      focus: null
    }
  }

  handleNewResults(res, location){
    this.setState({
      results: res,
      location: location
    });
  }

  getPan(pan){
    this.setState({pan: pan});
  }

  setFocus(id){
    this.setState({focus: id});
  }

  render() {
    return (
      <div className="wrapper">
        <MapView results={this.state.results} location={this.state.location} assignPan={this.getPan} setFocus={this.setFocus} focus={this.state.focus}/>
        <SearchBox resulthandler={this.handleNewResults} thePan={this.state.pan} setFocus={this.setFocus} focus={this.state.focus}/>
      </div>
    );
  }


}
export default App;
