import React, {Component} from "react";
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader';

export class AnswersList extends Component {
  render() {
    return(
      <div>
        <List>
          <Subheader>Liste des réponses ({this.props.answers.length})</Subheader>
          {this.props.answers.map((item, index) =>
            <span key={index}>
              <Divider/>
              <ListItem
                disabled={true}
                insetChildren={true}
                key={index}
                primaryText={item}
                rightIconButton={<FlatButton style={{margin:"5px"}} onTouchTap={(e)=>this.props.delete(index)} secondary={true}>Supprimer</FlatButton>}
                />
            </span>
          )}
        </List>
      </div>
    );
  }
}

export default class Ask extends Component{
  constructor(props, context){
    super(props, context);
    this.state = {
      answers:[],
      currentAnswer:"",
      error:"",
      question:"",
      open:false,
      message:""
    }
    this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  addQuestion(){
    console.log(this.state.answers.length);
    if(this.state.question == ""){
      this.setState({
        open:true,
        message:"Entrez une putain de question"
      });
    }
    else if(this.state.answers.length < 2){
      this.setState({
        open:true,
        message:"Entrez des putain de réponses"
      });
    }else{
      console.log("ok");
    }
  }

  addAnswer(e){
    e.preventDefault();
    if(this.state.currentAnswer != ""){
      var answers = this.state.answers;
      answers.push(this.state.currentAnswer);
      this.setState({
        answers:answers
      });
    }else{
      this.setState({
        error:"Entrez une réponse"
      });
    }
  }

  deleteAnswer(e){
    var answerIndex = e;
    console.log(answerIndex);
    this.setState(state =>{
      state.answers.splice(answerIndex, 1);
      return {answers: state.answers};
    });
  }

  handleChangeQuestion(e){
    this.setState({
      question:e.target.value,
    });
  }

  handleChangeAnswer(e){
    this.setState({
      currentAnswer:e.target.value,
      error:""
    });
  }

  handleRequestClose(){
    this.setState({
      open: false,
    });
  };

  render() {
    return(
      <Paper style={{padding:"34px"}} zDepth={1}>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          />
        <form>
          <TextField type="text" value={this.state.question} onChange={this.handleChangeQuestion}  floatingLabelText="Pose ta question" /> <br/>
          <TextField floatingLabelText="Réponse" type="text" value={this.state.currentAnswer} onChange={this.handleChangeAnswer} errorText={this.state.error}/><br/>
          <RaisedButton onTouchTap={this.addAnswer}>Add</RaisedButton>
          <AnswersList answers={this.state.answers.map((item)=>item)} delete={this.deleteAnswer}/><br/>
          <Divider/><br/>
          <RaisedButton onTouchTap={this.addQuestion}>Soumez la question</RaisedButton>
        </form>
      </Paper>
    );
  }
}
