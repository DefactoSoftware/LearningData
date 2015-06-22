'use strict';
angular.module('learningDataApp')
  .service ('overallOptions', function() {
    var dataType = [{
      name : 'Users',
      field : 'users',
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

    var interval = {
      value : 'day',
      day: 'Day',
      month: 'Month',
      year: 'Year'
    };

    var chartType = {
      value : 'lineChart',
      lineChart : 'Line chart',
      barChart : 'Bar chart'
    };

    var minDate = new Date('02/20/2015');
    var fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);
    var toDate = new Date();
    var selectedTenant = 'all tenants';

    return {
      getDataType: function() {
        return dataType;
      },
      getInterval: function(){
        return interval;
      },
      getChartType: function(){
        return chartType;
      },
      getMinDate: function(){
        return minDate;
      },
      getFromDate: function(){
        return fromDate;
      },
      getToDate: function(){
        return toDate;
      },
      getSelectedTenant: function(){
        return selectedTenant;
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
      setSelectedTenant: function(input) {
        selectedTenant = input;
      }
    };
  });
