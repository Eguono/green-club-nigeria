var firebase = require("firebase");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAruIwmpb-zZnKpC7LoJdgdSOHsIFnivYo",
    authDomain: "green-club-nigeria.firebaseapp.com",
    databaseURL: "https://green-club-nigeria.firebaseio.com",
    storageBucket: "green-club-nigeria.appspot.com",
    messagingSenderId: "76743229845"
  };
  
module.exports = firebase.initializeApp(config);


process.env.authDomain
process.env.databaseURL
process.env.storageBucket
process.env.messagingSenderId