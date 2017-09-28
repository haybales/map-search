import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import latlng from 'leaflet';


class MapView extends Component {
  constructor(props) {
    super(props);

    this.activatePan = this.activatePan.bind(this);
    this.props.assignPan(this.activatePan);
    this.state = {
      lat: this.props.location[0],
      lng: this.props.location[1],
      zoom: 13,
    };
  }

  activatePan(location) {
    const map = this.refs.map.leafletElement;
    map.panTo({lat: location[0], lng: location[1]});
  }


  render() {
    var position = [this.state.lat, this.state.lng];


    return (
      <Map ref='map' center={position} zoom={this.state.zoom} zoomControl={false} attributionControl={false}>
      <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.props.results.map(function(x){
          return(
            <Marker position={[x.geometry.location.lat(), x.geometry.location.lng()]}>
              <Popup>
                <p>
                  <strong>{x.name}</strong><br/>
                  {x.vicinity}
                </p>
              </Popup>
            </Marker>
          )
        })}

      </Map>

    );
  }
}

export default MapView
