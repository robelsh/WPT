import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Grid,Col,ProgressBar} from 'react-bootstrap';
import Chart from 'chart.js';
import CircularProgress from 'material-ui/CircularProgress';

export default class Question extends Component{
  constructor(props){
    super(props);
  }

  render() {
    const color = ["success","primary","info","danger","warning"];
    return(
      <Paper zDepth={1} style={{padding:"24px",marginTop:"24px",marginBottom:"24px"}}>
      {!this.props.data ? <div ><CircularProgress size={2} /></div> :
      <Grid style={{marginRight:"24px",marginLeft:"24px"}}>
      <Col xs={8} md={8}>
      <h2>{this.props.msg}</h2>
      {this.props.answers.map((answers, index) =>
        <RaisedButton primary={true} onTouchTap={(e)=>this.props.vote(index,this.props.index)}>{answers}</RaisedButton>
      )}
      <br/><br/>
      <ProgressBar>
      {this.props.data.map((item,index)=>
        <ProgressBar bsStyle={color[index]} striped now={item.vote*100/this.props.total} label={item.item} key={index} />
      )}
      </ProgressBar>
      </Col>
      <Col xs={12} md={8}>

      </Col>
      </Grid>}
      </Paper>
    );
  }
}
