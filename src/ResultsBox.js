import React from 'react';
import Result from './Result'

function ResultsBox(props){
  if(props.initialState){
    return(
      <div className="initialState">enter a location and a search term.</div>
    );
  }else{
    if(props.results.length>0){
      return(
        <div className="resultsbox" >
          {props.results.map(function(x, index){
            return(
              <Result
              className="resultbox"
              name={x.name}
              key={index}
              desc={x.vicinity}
              type={x.types[0]}
              xid={x.place_id}
              setFocus={props.setFocus}
              focus={props.focus}
              />
            )
          })}
        </div>
      );
    }else{
      return(
        <div className="notFound">No results found.</div>
      );
    }
  }
}

export default ResultsBox;
