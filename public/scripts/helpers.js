'use strict';
var app = app || {};

(function(module) {
  const Helper = {};
  // var timestamp = '2018-01-30T20:48:12.000Z';

  const months = [0, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
  const monthNum = [99,'01','02','03','04','05','06','07','08','09','10','11','12'];

  Helper.parseDate = function (timestamp) {
    timestamp = timestamp.slice(0, 10);
    var dateString = timestamp.split('-');
    timestamp = [dateString[1], dateString[2], dateString[0]];
    var monthIndex = monthNum.indexOf(timestamp[0]);
    return `${months[monthIndex]} ${timestamp[1]}, ${timestamp[2]}`;
  } 

  module.Helper = Helper;
})(app);