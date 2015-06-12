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

    var fromDate = new Date('05/01/2015');
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
  }).service ('activeUserOptions', function() {

    var interval = {
      value : 'day',
      day: 'Day',
      month: 'Month',
      year: 'Year'
    };

    var fromDate = new Date('05/01/2015');
    var toDate = new Date();
    var selectedTenant = 'all tenants';

    return {
      getInterval: function(){
        return interval;
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
      setInterval: function (input) {
        interval = input;
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
