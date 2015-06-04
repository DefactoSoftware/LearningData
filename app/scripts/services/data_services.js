'use strict';
angular.module('learningDataApp')
  .factory ('dataAPIservice', function(Restangular){

    var tenantStatsEndpoint = Restangular.all('tenantStats');
    var dailyTenantStatsEndpoint = Restangular.all('dailyTenantStats');
    var tenantsEndpoint = Restangular.all('tenants');
    var userStatsEndpoint = Restangular.all('userStats');

    return {
      getTenantStats: function(type, tenant, fromDate, toDate){
        return tenantStatsEndpoint.customGET('', {'type[]' : type, 'tenant' : tenant, 'fromDate' : fromDate, 'toDate' : toDate});
      },
      getDailyTenantStats: function(){
        return  dailyTenantStatsEndpoint.customGET('');
      },
       getTenants: function(){
        return  tenantsEndpoint.customGET('');
      },
      getUserStats: function(){
        return  userStatsEndpoint.customGET('');
      }
    };
  });
