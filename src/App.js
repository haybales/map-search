import React, { Component } from 'react';
import MapView from './MapView';
import SearchBox from './SearchBox'

class App extends Component {

  constructor(props){
    super(props);
    //make sure the methods are always refering to the right 'this'
    this.handleNewResults=this.handleNewResults.bind(this);
    this.getPan=this.getPan.bind(this);
    this.setFocus=this.setFocus.bind(this);

    //starter location
    var lat=37.7749;
    var lon=-122.4194;

    //set initial application state
    this.state={
      results: [],
      location: [lat, lon],
      pan: null,
      focus: null
    }
  }

  //method to handle results, will be called in the SearchBox component
  handleNewResults(res, location){
    this.setState({
      results: res,
      location: location
    });
  }

  //sets the method for panning the view to the right spot, will be called in the SearchBox component
  getPan(pan){
    this.setState({pan: pan});
  }

  //sets the ID of the focussed result, can be called from within either the SearchBox or the MapView
  setFocus(id){
    this.setState({focus: id});
  }

  render() {
    return (
      //a wrapper so one can cleanly sit ontop of the other in a single react component.
      <div className="wrapper">
        <MapView results={this.state.results} location={this.state.location} assignPan={this.getPan} setFocus={this.setFocus} focus={this.state.focus}/>
        <SearchBox resulthandler={this.handleNewResults} thePan={this.state.pan} setFocus={this.setFocus} focus={this.state.focus}/>
      </div>
    );
  }


}
export default App;
