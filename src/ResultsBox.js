import React, { Component } from 'react';
import Result from './Result'

class ResultsBox extends Component {

  constructor(props) {
    super(props);

  }

  renderResults(results, initialState){
    if(initialState){
      return(
        <div className="initialState">enter a location and a search term.</div>
      );
    }else{
      if(this.props.results.length>0){
        return(
          <div className="resultsbox" >
            {this.props.results.map(function(x, index){
              return(<Result
                className="resultbox"
                name={x.name}
                key={index}
                desc={x.vicinity}
                type={x.types[0]}
                xid={x.place_id}
                setFocus={this.props.setFocus}
                focus={this.props.focus}
                />)
            }.bind(this))}
          </div>
        );
      }else{
        return(
          <div className="notFound">No results found.</div>
        );
      }
    }
  }

  render(){
    return(this.renderResults(this.props.results, this.props.initialState));
  }
}

export default ResultsBox;
