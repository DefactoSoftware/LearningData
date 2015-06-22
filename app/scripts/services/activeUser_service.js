'use strict';
angular.module('learningDataApp')
  .service ('activeUserOptions', function() {

    var interval = {
      value : 'day',
      day: 'Day',
      month: 'Month',
      year: 'Year'
    };

    var minDate = new Date('02/20/2015');
    var fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);
    var toDate = new Date();
    var selectedTenant = 'all tenants';

    return {
      getInterval: function(){
        return interval;
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
  })
