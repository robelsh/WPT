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
    Firebase.database().ref('questions/').set({answers});
  }
}
