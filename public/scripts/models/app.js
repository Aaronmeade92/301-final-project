'use strict'

var users = [];
var app = app || {};
var userData = [];

(function (module){
function Day(name, date, meals, sleep, meds, mood){
  this.name = name;
  this.date = date;
  this.meals = meals;
  this.sleep = sleep;
  this.meds = meds;
  this.mood = mood;
}

function User(name){
  this.name = name;
  this.data = [];
}

User.fetchData = function(field, value){
  ///get request for data
  $.get('history/user', {field: field, val: value})
  .then(results => {
    results.forEach(function(day){
      userData.push(new Day(day.name, day.date, day.meals, day.sleep, day.meds, day.mood));
    })
  })
}

///just testting chart data
User.testPush = function(){
userData.push(new Day('test', '10/03/2017', 'tacos', 8, 'taco meds', 3));
}

module.Day = Day;
module.User = User;
module.userData = userData;

})(app);

app.User.testPush();
