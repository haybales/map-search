import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { divIcon } from 'leaflet';


class MapView extends Component {

  constructor(props) {
    super(props);
    //make sure the panning function has the right 'this'
    this.activatePan = this.activatePan.bind(this);
    //call the prop function to assign the pan function up into the App state so the searchbox can grab it
    this.props.assignPan(this.activatePan);
    this.state = {
      lat: this.props.location[0],
      lng: this.props.location[1],
      zoom: 13,
    };
  }


//reference the map and fly to a location
  activatePan(results) {
    const map = this.refs.map.leafletElement;
    var resultlocs=[];
    for(var i=0;i<results.length;i++){
      resultlocs[i]=[results[i].geometry.location.lat(), results[i].geometry.location.lng()];
    }
    map.fitBounds(resultlocs, {padding: [50, 50]});
  }

  setRender(x, index){
    let opacity=0.4;
    if(this.props.focus===x.place_id){
      opacity=1;
    }
    return(
      <Marker
        position={[x.geometry.location.lat(), x.geometry.location.lng()]}
        onClick={function(){this.props.setFocus(x.place_id)}.bind(this)}
        key={index}
        opacity={opacity}
      >
        <Popup>
          <p>
            <strong>{x.name}</strong><br/>
            {x.vicinity}
          </p>
        </Popup>
      </Marker>
    )

  }


  render() {
    var position = [this.state.lat, this.state.lng];
    return (
      <Map ref='map' center={position} zoom={this.state.zoom} zoomControl={false} attributionControl={false}>
      <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          id='mapbox.streets'
          url='https://api.mapbox.com/styles/v1/haybales/cj8560gz21enx2rqtyytdijos/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGF5YmFsZXMiLCJhIjoiY2o4NTV5NWMxMGhjaDMyb2EzZW5vZm04aiJ9.TcLW3YoxL6ELLYAGKNOvpg'
        />
        {this.props.results.map(this.setRender.bind(this))}

      </Map>

    );
  }
}

export default MapView
