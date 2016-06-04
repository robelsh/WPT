import React, {Component} from 'react';
import {Router,Link} from 'react-router';

export default class Main extends Component {
  constructor(props){
    super(props);

  }
  render(){
    const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];

    return (
      <div className="container">
        <Link to="/Ask">POSER QUESTION</Link>
        <Link to="/">HOME/Link>
        {this.props.children}
      </div>
    );
  }
}
