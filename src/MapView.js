import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';


class MapView extends Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom} zoomControl={false} attributionControl={false}>
      <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span>A test marker. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>

    );
  }
}

export default MapView
