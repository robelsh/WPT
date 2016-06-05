import React, {Component} from "react";
import Question from "./question";
import {Grid} from 'react-bootstrap';
import {firebaseUtils} from '../firebase/firebase'
import Firebase from 'firebase';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      questions:[],
      answers:[]
    };
    this.loadQuestionsFromFirebase = this.loadQuestionsFromFirebase.bind(this);
  }

  loadQuestionsFromFirebase(){
    let questions = [];
    let answers = [];
    firebase.database().ref('Questions').on('value', (dataSnapshot) => {
      dataSnapshot.forEach((snapshot) => {
        questions.push(snapshot.val().question);
        answers.push(snapshot.val().answers);
      });
      this.setState({
        questions:questions,
        answers:answers
      });
    });
  }

  componentDidMount(){
    this.loadQuestionsFromFirebase();
  }

  render() {
    return(
      <div>
        <Grid>
          {this.state.questions.map((question, index) =>
            <Question msg={question} answers={this.state.answers[index]}/>
          )}
        </Grid>
      </div>
    );
  }
}
