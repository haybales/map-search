import React, { Component } from 'react';
import geolocator from 'geolocator';

class SearchBox extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchValue: '',
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

  handleChange(event) {
    this.setState({searchValue: event.target.value});
  }

  handleSubmit(event){
    let lat = null;
    let lon = null;
    event.preventDefault();
    var service = new window.google.maps.places.PlacesService(document.createElement('div'));
    geolocator.geocode(this.state.searchValue, function (err, location) {
      if(err){
        alert(err)
      }else{
        lat = location.coords.latitude;
        lon = location.coords.longitude;
        var request = {
          location: new window.google.maps.LatLng(lat,lon),
          radius: '100000',
          type: ['restaurant']
        };

        service.nearbySearch(request, function(results, status){
          this.setState({results: results});
          console.log(results[0])
          this.props.resulthandler(results, [lat, lon]);
          this.props.thePan([lat, lon]);
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
        <input type="submit" value="Submit" />
      </form>

      <div className="resultsbox">
        {this.state.results.map(function(x){
          return <Result name={x.name} />
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
    return (
      <div className="resultbox">
        <strong>{name}</strong>
      </div>
    );
  }
}

export default SearchBox;
