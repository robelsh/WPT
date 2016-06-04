import React, {Component} from "react";
import {FormGroup,FormControl,ControlLabel,Button,ListGroup,ListGroupItem} from "react-bootstrap";

export class AnswersList extends Component {
  render() {

    return(
      <div>
        {this.props.answers.map((item, index) =>
          <ListGroup>
            <ListGroupItem>{item} <Button>X</Button></ListGroupItem>
          </ListGroup>
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
      currentAnswer:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.AddAnswer = this.AddAnswer.bind(this);
  }

  AddAnswer(){
    var answers = this.state.answers;
    answers.push(this.state.currentAnswer);
    this.setState({
      answers:answers
    });
  }

  handleChange(e){
    this.setState({
      currentAnswer:e.target.value
    });
  }

  render() {
    return(
      <div>

        <AnswersList answers={this.state.answers.map((item)=>item)}/>
        <form>
          <FormGroup controlId="formControlsText">
            <ControlLabel>Question</ControlLabel>
            <FormControl type="text" placeholder="Pose ta question" />
            <ControlLabel>Reponses</ControlLabel>
            <FormControl type="text" placeholder="Reponse" onChange={this.handleChange}/> <Button onTouchTap={this.AddAnswer}>Add</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}
