document.ready(function () {

  // Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDENEdB5VDP9BMtdCAOoUY5SXzz3NyrCVU",
    authDomain: "train-scheduler-19e4d.firebaseapp.com",
    databaseURL: "https://train-scheduler-19e4d.firebaseio.com",
    projectId: "train-scheduler-19e4d",
    storageBucket: "",
    messagingSenderId: "681156663337",
    appId: "1:681156663337:web:f49ef9d9fd2a03af1be438"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let database = firebase.database();


});
