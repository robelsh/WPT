import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

export class AnswersList extends Component {
  render() {
    return(
      <div>
        {this.props.answers.map((item, index) =>
          <List>
            <ListItem>{item} <Button onTouchTap={this.props.delete} value={index}>X</Button></ListItem>
          </List>
        )}
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
      error:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
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
    var answerIndex = parseInt(e.target.value, 10);
    console.log(answerIndex);
    this.setState(state =>{
      state.answers.splice(answerIndex, 1);
      return {answers: state.answers};
    });
  }

  handleChange(e){
    this.setState({
      currentAnswer:e.target.value,
      error:""
    });
  }

  render() {
    return(
      <Paper style={{padding:"34px"}} zDepth={1}>
        <form>
          <TextField type="text" hintText="Pose ta question" />
          <TextField hintText="Réponse" type="text" value={this.state.currentAnswer} onChange={this.handleChange} errorText={this.state.error}
/>
          <Button onTouchTap={this.addAnswer}>Add</Button>
          <AnswersList answers={this.state.answers.map((item)=>item)} delete={this.deleteAnswer}/>
        </form>
      </Paper>
    );
  }
}
