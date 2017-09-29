import React, { Component } from 'react';

class Result extends Component {
  constructor(props) {
    super(props);
  }

  setRender(){
    const name = this.props.name;
    const desc = this.props.desc;
    //replace the underscores so it looks better.
    const type = this.props.type.replace(/_/g, " ");
    let classes="resultbox"
    //decide if the selection is focussed
    if(this.props.focus===this.props.xid){
      classes+=" focussed"
    }
    return (
      <div className={classes} onClick={function(){this.props.setFocus(this.props.xid)}.bind(this)}>
        <strong>{name}</strong> - <span>{type}</span><p>{desc}</p>
      </div>
    );
  }

  render() {
    return (
      this.setRender()
    );
  }
}

export default Result
