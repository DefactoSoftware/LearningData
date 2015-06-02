'use strict';
angular.module('learningDataApp')
  .factory ('dataAPIservice', function(Restangular){

    var totalsEndpoint = Restangular.all('totals');
    var tenantInfoEndpoint = Restangular.all('tenants');
    var testEndpoint = Restangular.all('test');

    return {
      getTotals: function(type, fromDate, toDate){
        var request = {'type' : type, 'fromDate' : fromDate, 'toDate' : toDate};
        return totalsEndpoint.post(request);
      },
      getTenantInfo: function(tenant, fromDate, toDate){
        var request = {'tenant' : tenant, 'fromDate' : fromDate, 'toDate' : toDate};
        return tenantInfoEndpoint.post(request);
      },
      getTest: function(){
        return testEndpoint.getList();
      }
    };
  });
