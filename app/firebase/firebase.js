import Firebase from 'firebase';

var config = {
  apiKey: "AIzaSyD5abQd49bFLvUxejzz0NhFgYcAVdoqPEI",
  authDomain: "wpt-dev.firebaseapp.com",
  databaseURL: "https://wpt-dev.firebaseio.com",
  storageBucket: "wpt-dev.appspot.com",
};

Firebase.initializeApp(config);

export let firebaseUtils = {
  newQuestion : function(question, answers) {
    var vote = [];
    vote.length = answers.length;
    for (var i = 0; i < vote.length; i++) {
      vote[i]=1;
    }
    Firebase.database().ref("Questions/"+question).set({"question":question,"answers":answers});
    Firebase.database().ref("Vote/"+question).set({"question":question,"vote":vote});
  },
  newVote : function(question, index, nbrVotes){
    nbrVotes[index] += 1;
    Firebase.database().ref("Vote/"+question+"/vote").set(nbrVotes);
  }
}
