import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Grid,Col} from 'react-bootstrap';
import Chart from 'chart.js';
import CircularProgress from 'material-ui/CircularProgress';

export default class Question extends Component{
  constructor(props){
    super(props);
    this.interval = null;
    this.createChart = this.createChart.bind(this);
  }

  createChart() {
    var chart = new CanvasJS.Chart(this.props.msg,
      {
        title:{
          text: ""
        },
        legend: {
          maxWidth: 350,
          itemWidth: 120
        },
        data: [
          {
            type: "pie",
            dataPoints: this.props.data
          }
        ]
      });
      chart.render();
    }

    componentDidMount(){
      this.interval=setInterval(()=>{
        this.createChart();
      },500);
    }
    render() {
      return(
        <Paper zDepth={1} style={{padding:"24px",marginTop:"24px",marginBottom:"24px"}}>
          {!this.props.data ? <div ><CircularProgress size={2} /></div> :
          <Grid tyle={{marginRight:"24px"}}>
            <h2>{this.props.msg}</h2>
            <Col xs={6} md={4}>
              {this.props.answers.map((answers, index) =>
                <RaisedButton primary={true} onTouchTap={(e)=>this.props.vote(index,this.props.index)}>{answers}</RaisedButton>
              )}
            </Col>
            <Col xs={6} md={8} >
              <div id={this.props.msg} style={{height:"200px",width:"200px"}}></div>
            </Col>
          </Grid>}

        </Paper>
      );
    }
  }
