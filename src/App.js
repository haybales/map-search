import React, { Component } from 'react';
import MapView from './MapView';
import SearchBox from './SearchBox'

class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <MapView />
        <SearchBox />
      </div>
    );
  }


}
export default App;
