import React, {Component} from 'react';
import {Router,Link} from 'react-router';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class Main extends Component {
  constructor(props){
    super(props);
  }
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render(){
    const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];

    return (
      <div className="container">
        <Link to="/Ask">link to ask</Link> <br/>
        <Link to="/">link to home</Link>
        {this.props.children}
      </div>
    );
  }
}

Main.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
