'use strict';
angular.module('learningDataApp')
  .service ('dataOptions', function() {
    var dataType = [{
      name : 'Users',
      field : 'users',
      checked : true
    }, {
      name : 'Active users',
      field : 'active_users',
      checked : true
    }, {
      name : 'Completions',
      field : 'completions',
      checked : true
    }, {
      name : 'Spaces',
      field : 'spaces',
      checked : true
    }, {
      name : 'Chapters',
      field : 'chapters',
      checked : true
    }];

    var interval = [{
      name : 'Day',
      checked : true
    }, {
      name : 'Month',
      checked : false
    }, {
      name :'Year',
      checked : false
    }];

    var chartType = [{
      name : 'Line chart',
      partial : 'lineChart',
      checked : true
    }, {
      name : 'Bar chart',
      partial : 'barChart',
      checked : false
    }];

    var fromDate = new Date('05/01/2015');

    var toDate = new Date('06/01/2015');

    return {
      getDataType: function() {
        return dataType;
      },
      getInterval: function(){
        return interval;
      },
      getChartType: function(checked){
        if (checked === false){
          return chartType;
        }
        else {
          for (var i = 0; i < chartType.length ; i++ ){
            if (chartType[i].checked === true){
              return chartType[i].partial;
            }
          }
        }
      },
      getFromDate: function(){
        return fromDate;
      },
      getToDate: function(){
        return toDate;
      },
      setDataType: function (input){
        dataType = input;
      },
      setInterval: function (input) {
        interval = input;
      },
      setChartType: function (input) {
        chartType = input;
      },
      setFromDate: function(input){
        fromDate = input;
      },
      setToDate: function(input){
        toDate = input;
      },
    };
  });
