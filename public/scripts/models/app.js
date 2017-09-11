'use strict';

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

function submitForm () {
$('#submit').on('click', function(e) {
  e.preventDefault();
  console.log('is this working');
  ///TODO: exercise and suppliments
  let name = $('#name').val();
  let today = new Date();
  let date = today.setDate(today.getDate()-1);
  let sleep = $('#hours').val();
  let meals = [$('#breakfast').val(),$('#lunch').val(),$('#dinner').val(), $('#snacks').val()];
  let meds = $('#medications').val();
  let moodText = $('#mood option:selected').text();
  let mood = convertMood(moodText);
  let exercise = $('#exercise').val();

  $.post('/days', {name: name, date: today, meals: meals, sleep: sleep, meds: meds, mood: mood, exercise: exercise}).then(response => {
    console.log(name)
    $.get(`/history/${name}`)
    .then(results =>{
      console.log(results);
      userData = results;
    })
  })
});
}

function convertMood(mood){
  switch (mood) {
    case 'Excellent':
      return 6;
      break;
    case 'Very good':
      return 5;
      break;
    case 'Good':
      return 4;
      break;
    case 'Not so bad':
      return 3;
      break;
    case 'Bad':
      return 2;
      break;
    case 'Terrible':
      return 1;
      break;
    default: return 0;

  }
}

module.Day = Day;
module.User = User;
module.userData = userData;
module.submitForm = submitForm;

})(app);

app.submitForm();
