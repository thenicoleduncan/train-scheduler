$(document).ready(function () {

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

  let trainName = "";
  let destination = "";
  let frequency = 0;
  let firstTrainTime = 0;

  $(document).on("click", ".btn", function (event) {

    event.preventDefault();
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrainTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();
    // console.log(frequency);
    let trainInfo = {
      train_name: trainName,
      destination: destination,
      first_train_time: firstTrainTime,
      frequency: frequency
    }
    database.ref().push(
      trainInfo
    )
  });

  database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val().train_name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().first_train_time);
    console.log(childSnapshot.val().frequency);
    let nextArrivalArr = childSnapshot.val().first_train_time.split(":");
    console.log(nextArrivalArr);

    let nextArrival = moment().hours(nextArrivalArr[0]).minutes(nextArrivalArr[1]);
    console.log(nextArrival);

    let nextArrivalMax = moment.max(moment(), nextArrival);
    let trainArrival;
    let trainMin;

    if (nextArrivalMax == nextArrival) {
      trainArrival = nextArrival.format("hh:mm A");
      trainMin = nextArrival.diff(moment(), "minutes");
    } else {
      var diffTime = moment().diff(nextArrival, "minutes");
      var timeRemainder = diffTime % childSnapshot.val().frequency;
      trainMin = childSnapshot.val().frequency - timeRemainder;
      trainArrival = moment().add(trainMin, "m").format("hh:mm A");
    }
    
    let row = $("<tr>");
    let tableData = $(
      "<td>" + childSnapshot.val().train_name + "</td>" +
      "<td>" + childSnapshot.val().destination + "</td>" +
      "<td>" + childSnapshot.val().frequency + "</td>" +
      "<td>" + trainArrival + "</td>" +
      "<td>" + trainMin + "</td>");
      $(row).append(tableData);
      $("tbody").append(row);

  });


});
