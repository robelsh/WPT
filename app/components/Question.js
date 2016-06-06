import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Grid,Col,ProgressBar} from 'react-bootstrap';
import CircularProgress from 'material-ui/CircularProgress';
import PieIcon from 'material-ui/svg-icons/editor/pie-chart';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import ReactHighcharts from 'react-highcharts';

export default class Question extends Component{
  constructor(props){
    super(props);
    this.state = {
      open:false,
      data:[],
      options:[],
      voted:false,
      ips:[]
    }
    this.displayChart = this.displayChart.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  displayChart(e){
    this.setState({
      open:true
    });
  }
  handleClose(){
    this.setState({
      open:false
    });
  }

  loadIpsFromFirebase(){
    let ips = [];
    var ipInfos = JSON.parse(document.getElementById("ip").innerHTML);

    firebase.database().ref('Vote/'+this.props.msg+"/infos").on('value', (dataSnapshot) => {
      dataSnapshot.forEach((snapshot) => {
        ips.push(snapshot.val().query);
      });
      this.setState({
        currentIp:ipInfos.query,
        ips:ips
      });
    });
  }

  componentDidMount(){
    this.loadIpsFromFirebase();
  }

  render() {
    const color = ["success","primary","info","danger","warning"];
    var config = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: true,
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: false,
          cursor: '',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Votes',
        colorByPoint: true,
        data: this.props.dataPie
      }]
    };
    var voted = false;
    if(this.state.ips.indexOf(this.state.currentIp)>-1){
      voted=true;
    }
    return(
      <div>
        <Dialog
          title="Charts"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          >
          <ReactHighcharts config = {config}></ReactHighcharts>
        </Dialog>
        <Paper>
          {!this.props.data ? <div ><CircularProgress size={2} /></div> :
          <Grid>
            <Col xs={8} md={8}>
              <h2>{this.props.msg}</h2>
              {this.props.answers.map((answers, index) =>
                <RaisedButton disabled={voted} primary={true} onTouchTap={(e)=>this.props.vote(index,this.props.index)}>{answers}</RaisedButton>
              )}
              <br/><br/>
              <ProgressBar width="100px">
                {this.props.data.map((item,index)=>
                  <ProgressBar bsStyle={color[index]} striped now={item.vote*100/this.props.total} label={item.item} key={index} />
                )}
              </ProgressBar>
              <IconButton onTouchTap={(e)=>this.displayChart(this.props.index)}>
                <PieIcon/>
              </IconButton>
            </Col>
          </Grid>}
        </Paper>
      </div>
    );
  }
}
