$(document).ready(function(){


  function Train(name,destination,firstTrain,frequency){
    this.name = name,
    this.destination = destination,
    this.firstTrain = firstTrain,
    this.frequency = frequency,
    this.nextTrain = function(time){
      var elapsedTime = time.diff(this.firstTrain,"minutes");
      var nextTrainIn = elapsedTime % this.frequency;
      return nextTrainIn;
    },
    this.addToSchedule(){
      var row = $("<tr>");
      var 
    }
  }

  var trains = [];
  alert("hi");
  Initialize Firebase
var config = {
  apiKey: "AIzaSyDEghsoO5vEvNPD9FwXSDONLeHtLz3FdPQ",
  authDomain: "newproject-e5470.firebaseapp.com",
  databaseURL: "https://newproject-e5470.firebaseio.com",
  projectId: "newproject-e5470",
  storageBucket: "newproject-e5470.appspot.com",
  messagingSenderId: "941985779737"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("child_added", function(snapshot){
  //grab data from the database when new child added
  var name = shapshot.val().name;
  var destination = snapshot.val().destination;
  var firstTrain = snapshot.val().firstTrain;
  var frequency = snapshot.val().frequency;

  //create new train object with updated data
  var train = new Train(name,destination,firstTrain,frequency);
  trains.push(train);
})

$(".modal-footer").on("click", function (e) {
  //grab user input
  var name = $("#train-name").val().trim();
  var destination = $("#train-destination").val().trim();
  var firstTrain = $("#train-frst").val().trim();
  var frequency = $("train-frequency").val().trim();

  //push to database
  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });

});


});