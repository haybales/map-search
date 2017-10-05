import React, { Component } from 'react';

function Result(props){

  //replace the underscores so it looks better.
  const type = props.type.replace(/_/g, " ");
  const name = props.name;
  const desc = props.desc;

  let classes="resultbox"
  //decide if the selection is focussed
  if(props.focus===props.xid){
    classes+=" focussed"
  }
  return (
    <div className={classes} onClick={function(){props.setFocus(props.xid)}.bind(this)}>
      <strong>{name}</strong> - <span>{type}</span><p>{desc}</p>
    </div>
  );
}

export default Result
