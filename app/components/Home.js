import React, {Component} from "react";
import Question from "./question";
import {Grid} from 'react-bootstrap';
import {firebaseUtils} from '../firebase/firebase'
export default class Home extends Component{
  render() {
    return(
      <div>
        <Grid>
          <Question msg="Question 1" answers={["Oui","Non"]}/>
          <Question msg="Question 1" answers={["Oui","Non","Peut-etre"]}/>
          <Question msg="Question 1" answers={["Oui","Non","Peut-etre","Je sais pas"]}/>
        </Grid>
      </div>
    );
  }
}
