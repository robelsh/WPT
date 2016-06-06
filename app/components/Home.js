import React, {Component} from "react";
import Question from "./Question";
import {firebaseUtils} from '../firebase/firebase'
import Firebase from 'firebase';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      questions:[],
      answers:[],
      nbrVotes:[],
      data:[],
      totalVote:[],
      dataPie:[]
    };
    this.interval = null;
    this.loadQuestionsFromFirebase = this.loadQuestionsFromFirebase.bind(this);
    this.loadVotesFromFirebase = this.loadVotesFromFirebase.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  generateData(e){
    let data = [];
    let dataPie = [];
    let sum = [];
    this.state.questions.map((question)=>{
      let currentData = [];
      let currentDataPie = [];
      let currentSum = 0;
      let index = this.state.questions.indexOf(question);
      let votes = this.state.nbrVotes[index];
      this.state.answers[index].map((item,i)=>{
        var current = votes[i];
        currentSum+=votes[i];
        currentDataPie.push({name:item,y:votes[i]});
        currentData.push({item:item,vote:votes[i]});
      });
      dataPie.push(currentDataPie);
      data.push(currentData);
      sum.push(currentSum);
    });
    this.setState({
      dataPie:dataPie,
      data:data,
      totalVote:sum
    });
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

  loadVotesFromFirebase(){
    var nbrVotes = [];
    this.state.questions.map((question,index)=>{
      firebase.database().ref('Vote/'+question+"/vote").on('value', (dataSnapshot) => {
        nbrVotes.push(dataSnapshot.val());
      });
    });
    this.setState({
      nbrVotes:nbrVotes
    });
  }

  handleVote(e,index){
    var ipInfos = JSON.parse(document.getElementById("ip").innerHTML);
    firebaseUtils.newVote(this.state.questions[index],e,this.state.nbrVotes,index,ipInfos);
  }

  componentDidMount(){
    this.interval=setInterval(()=>{
      this.loadQuestionsFromFirebase();
      this.loadVotesFromFirebase();
      this.generateData()
    },500);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    return(
      <div>
      {this.state.questions.map((question, index) =>
        <Question msg={question} answers={this.state.answers[index]} vote={this.handleVote} index={index} dataPie={this.state.dataPie[index]} data={this.state.data[index]} total={this.state.totalVote[index]}/>
      )}
      </div>
    );
  }
}
