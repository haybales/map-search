import React, { Component } from 'react';
import ResultsBox from './ResultsBox'
import geolocator from 'geolocator';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);

    this.state = {
      searchValue: 'San Francisco',
      keyword: '',
      range: 10,
      results: [],
      initialState: true
    }

    geolocator.config({
        language: "en",
        google: {
            version: "3",
            key: "AIzaSyBrLxlfWBEnisKWdAfPaxd7WlJMpvpl4R8"
        }
    });


  }

//Activate when the form is changed, setting the searchvalue
  handleSearchChange(event) {
    this.setState({searchValue: event.target.value});
  }
  handleKeywordChange(event) {
    this.setState({keyword: event.target.value});
  }

//activate when the form is submitted
  handleSubmit(event){
    let lat = null;
    let lon = null;
    event.preventDefault();
    //dummy div for the google maps service, since not actually using google maps
    var service = new window.google.maps.places.PlacesService(document.createElement('div'));
    //use geolocator package to get the lat+long of searched value
    geolocator.geocode(this.state.searchValue, function (err, location) {
      if(err){
        alert(err)
      }else{
        //if theres no errror, put the lat+long into a request...
        lat = location.coords.latitude;
        lon = location.coords.longitude;
        var request = {
          location: new window.google.maps.LatLng(lat,lon),
          radius: this.state.range*1000,
          keyword: this.state.keyword
        };
        //the request gets sent to the places API
        service.nearbySearch(request, function(results, status){
          this.setState({results: results, initialState: false});
          //handle use the App result handler to transfer the results to the Map
          this.props.resulthandler(results, [lat, lon]);
          //Use the pan to pass the lat+long to the map moving method on the leaflet map reference
          this.props.thePan(results);
        }.bind(this));
      }
    }.bind(this));

  }


  render(){
    return(
      <div className="searchbox">

        <form onSubmit={this.handleSubmit}>
          <input
          type="text"
          placeholder="Location"
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
          />
          <input
          type="text"
          placeholder="Enter a seach term..."
          value={this.state.keyword}
          onChange={this.handleKeywordChange}
          />
          <Slider
          value={this.state.range}
          orientation="horizontal"
          max={50}
          onChange={value => this.setState({ range: value })}
          /><span className="range">Range: {this.state.range} km</span>
          <input type="submit" value="Submit" />
        </form>

        <ResultsBox
          results={this.state.results}
          initialState={this.state.initialState}
          setFocus={this.props.setFocus}
          focus={this.props.focus}
        />

      </div>
    )
  }
}



export default SearchBox;
