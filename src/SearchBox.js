import React, { Component } from 'react';
import geolocator from 'geolocator';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchValue: '',
      range: 10,
      results: [{name: "sammy"}]
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
  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

//activate when the form is submitted
  handleSubmit(event){
    let lat = null;
    let lon = null;
    event.preventDefault();
    //dummy div for the google maps service, since not actually using google maps
    var service = new window.google.maps.places.PlacesService(document.createElement('div'));
    //use geolocatior package to get the lat+long of searched value
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
          type: ['restaurant']
        };
        //the request gets sent to the places API
        service.nearbySearch(request, function(results, status){
          this.setState({results: results});
          console.log(results[0])
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
        placeholder="Search..."
        value={this.state.searchValue}
        onChange={this.handleChange}
        />
        <Slider
        value={this.state.range}
        orientation="horizontal"
        max={50}
        onChange={value => this.setState({ range: value })}
        /><span className="range">{this.state.range} km</span>
        <input type="submit" value="Submit" />
      </form>

      <div className="resultsbox">
        {this.state.results.map(function(x){
          return <Result name={x.name} desc={x.vicinity} />
        })}
      </div>
      </div>
    )
  }
}

class Result extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const name = this.props.name;
    const desc = this.props.desc;
    return (
      <div className="resultbox">
        <strong>{name}</strong><p>{desc}</p>
      </div>
    );
  }
}

export default SearchBox;
