'use strict';
var app = app || {};

(function(module) {
  const Helper = {};
  // var timestamp = '2018-01-30T11:48:12.000Z';

  const months = [0, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
  const monthNum = [99,'01','02','03','04','05','06','07','08','09','10','11','12'];

  Helper.parseDate = function (timestamp) {
    // console.log(timestamp);
    //Get Current Date
    var dateNow = new Date();
    var dateNowStr = dateNow.toString().slice(4,15);
    var dateNowArr = dateNowStr.split(' ');
    // console.log('dateNowArr', dateNowArr);

    timestamp = timestamp.slice(0, 10);
    var dateString = timestamp.split('-');
    timestamp = [dateString[1], dateString[2], dateString[0]];
    var monthIndex = monthNum.indexOf(timestamp[0]);
    var dateCheck = [months[monthIndex], timestamp[1], timestamp[2]];
    // console.log('dateCheck', dateCheck);
    // var intTimeStamp1 = parseInt(timestamp[1]);
    // console.log('timestamp[1]int',intTimeStamp1);
    // console.log(dateNow.getHours());
    // if (dateNow.getHours() < intTimeStamp1) {
    //   console.log('yes');
    //   timestamp[1] = parseInt(timestamp[1] - 1);
    //   console.log(timestamp[1]);
    // }
    if (dateNowArr.toString() == dateCheck.toString()){ return('Today')};

    return `${months[monthIndex]} ${timestamp[1]}, ${timestamp[2]}`;
  } 
 
  Helper.parseTime = function (timestamp) {
    var timeArr =[];
    var offset = (new Date().getTimezoneOffset()/60);
    var timeString = timestamp.slice(11,16);
    timeString = timeString.split(':');
    
    timeString.forEach( x => {
      var item = parseInt(x);
      timeArr.push(item);
    })
    timeArr[1] = timeArr[1].toString().padStart(2,0);
    // console.log(timeArr[1]);
    //Accounts for TimeZone Difference
    if(timeArr[0] < offset) {
      var newOffset = 24 - offset;
      timeArr[0] = timeArr[0] + newOffset;
    } else {
      timeArr[0] = timeArr[0] - offset;
    }
    // console.log([timeArr[0],timeArr[1]]);
   //get current time stamp on for now check

   var currentTimeH = new Date();
   currentTimeH = currentTimeH.getHours();
   currentTimeH = currentTimeH.toString().padStart(2,0);
  //  console.log('cT', currentTimeH);
   var currentTimeM = new Date();
   currentTimeM = currentTimeM.getMinutes();
   currentTimeM = currentTimeM.toString().padStart(2,0);
   var dbHour = timeArr[0].toString().padStart(2,0);
   var timeAtPost = `${currentTimeH}:${currentTimeM}`;
   var timeInDb = `${dbHour}:${timeArr[1]}`;

   if (timeAtPost == timeInDb) { return ' less than a minute ago.' }

   //=======================

    if (timeArr[0] < 12) {
      if(timeArr[1] === 0) {
        timeArr[1] = '00';
      }
      if(timeArr[0] === 0){
        if(timeArr[1] === 0) {
          timeArr[1] = '00';
        }
        return(`${12}:${timeArr[1]} AM`);
        } else {
        return(`${timeArr[0]}:${timeArr[1]} AM`);
      }
    } 
    if (timeArr[0] > 11){
      if(timeArr[1] === 0) {
        timeArr[1] = '00';
      }
      if(timeArr[0] === 12){
        return(`${timeArr[0]}:${timeArr[1]} PM`);
      }
      if(timeArr[0] > 12) {
        return(`${timeArr[0] - 12}:${timeArr[1]} PM`);
        } 
    }    
  }

  module.Helper = Helper;
})(app);