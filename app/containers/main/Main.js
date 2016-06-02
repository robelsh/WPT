

import React, {Component} from 'react';
import {Router,Link} from 'react-router';

export default class Main extends Component {
  constructor(props){
    super(props);

  }
  render(){
      return (
        <div><Link to="/Test">link to test</Link>
        {this.props.children}</div>
      );
    }
  }
