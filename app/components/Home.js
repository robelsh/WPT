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
      answers:[],
      nbrVotes:[]
    };
    this.interval = null;
    this.loadQuestionsFromFirebase = this.loadQuestionsFromFirebase.bind(this);
    this.loadVotesFromFirebase = this.loadVotesFromFirebase.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  loadQuestionsFromFirebase(){
    let questions = [];
    let answers = [];
    firebase.database().ref('Questions/question').on('value', (dataSnapshot) => {
      dataSnapshot.forEach((snapshot) => {
        console.log(snapshot.val());
      });
    });
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

  loadVotesFromFirebase(){
    var nbrVotes = [];
    this.state.questions.map((question,index)=>{
      firebase.database().ref('Vote/'+question+"/vote").on('value', (dataSnapshot) => {
        nbrVotes = dataSnapshot.val();
      });
    });
    this.setState({
      nbrVotes:nbrVotes
    });
  }

  handleVote(e,index){
    firebaseUtils.newVote(this.state.questions[index],e,this.state.nbrVotes);
  }

  componentDidMount(){
    this.interval=setInterval(()=>{
      this.loadQuestionsFromFirebase();
      this.loadVotesFromFirebase();
    },1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    return(
      <div>
        <Grid>
          {this.state.questions.map((question, index) =>
            <Question msg={question} answers={this.state.answers[index]} vote={this.handleVote} index={index}/>
          )}
        </Grid>
      </div>
    );
  }
}
