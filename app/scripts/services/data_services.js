'use strict';
angular.module('learningDataApp')
  .factory ('dataAPIservice', function(Restangular){

    var tenantStatsEndpoint = Restangular.all('tenantStats');
    var dailyTenantStatsEndpoint = Restangular.all('dailyTenantStats');
    var tenantsEndpoint = Restangular.all('tenants');
    var userStatsEndpoint = Restangular.all('userStats');
    var testEndpoint = Restangular.all('test');

    return {
      getTenantStats: function(type, tenant, fromDate, toDate){
        var request = {'type' : type, 'tenant' : tenant, 'fromDate' : fromDate, 'toDate' : toDate};
        return tenantStatsEndpoint.post(request);
      },
      getDailyTenantStats: function(){
        return  dailyTenantStatsEndpoint.customGET("");
      },
       getTenants: function(){
        return  tenantsEndpoint.customGET("");
      },
      getUserStats: function(){
        return  userStatsEndpoint.customGET("");
      }
    };
  });
