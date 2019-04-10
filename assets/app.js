$(document).ready(function(){


  function Train(name,destination,firstTrain,frequency){
    this.name = name,
    this.destination = destination,
    this.firstTrain = moment(firstTrain,"HH:mm"),
    this.frequency = frequency,
    this.elapsedTime = moment().diff(this.firstTrain,"minutes"),
    this.minAway = this.frequency - (this.elapsedTime % this.frequency),
    this.nextTrain = this.firstTrain.add(this.elapsedTime+this.minAway,"m").format("HH:mm");
      
    }

  var trains = [];

  // Initialize Firebase
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
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var firstTrain = snapshot.val().firstTrain;
  var frequency = snapshot.val().frequency;

  //create new train object with updated data
  var train = new Train(name,destination,firstTrain,frequency);
  trains.push(train);
  publishTrains();
});

$("#submit").on("click", function (e) {
  //grab user input
  var name = $("#train-name").val().trim();
  var destination = $("#train-destination").val().trim();
  var firstTrain = $("#train-first").val().trim();
  var frequency = $("#train-frequency").val().trim();

  //push to database
  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });

});

function publishTrains(){
  $("#trains").empty();
  trains.forEach(function(train,i){
    var train = trains[i];
    var row = $("<tr>");
    row
      .append(addData(train.name))
      .append(addData(train.destination))
      .append(addData(train.frequency))
      .append(addData(train.nextTrain))
      .append(addData(train.minAway));


    function addData(value){
      var td = $("<td>");
      td.text(value);
      return td;
    }
    $("#trains").append(row);

  });
}

$("#login").on("click", function(){
  var key = $("#admin-key").val().trim();
  console.log(key);
  if (key == "pastapasta"){
    window.location.replace("./admin.html");
  }
  else{
    $("#warning").text("Wrong key");
  }


});

});