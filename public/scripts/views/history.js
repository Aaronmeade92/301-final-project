'use strict'
app = app || {};


var chartProperties = function(){
  var labels = app.userData.map(function(day){
    return day.date;
  })
  var data = app.userData.data.map(function(day){
    return day.mood;
  })
}



var handleClick = function(event){
  var activeElement = ctx.getElementAtEvent(event);
  console.log(activeElement);

}
