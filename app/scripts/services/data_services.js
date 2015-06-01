'use strict';
angular.module('learningDataApp')
  .factory ('dataAPIservice', function(Restangular){

    var totalsEndpoint = Restangular.all('totals');
    var testEndpoint = Restangular.all('test');

    return {
      getTotals: function(type, tenant, fromDate, toDate){
        var request = {'type' : type, 'tenant' : tenant, 'fromDate' : fromDate, 'toDate' : toDate};
        return totalsEndpoint.post(request);
      },

      getTest: function(){
        return testEndpoint.getList();
      }
    };
  });
