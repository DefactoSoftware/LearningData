'use strict';
angular.module('learningDataApp')
  .factory ('dataAPIservice', function(Restangular){

    var tenantStatsEndpoint = Restangular.all('tenantStats');
    var dailyTenantStatsEndpoint = Restangular.all('dailyTenantStats');
    var tenantsEndpoint = Restangular.all('tenants');
    var loginStatsEndpoint = Restangular.all('loginStats');
    var wordSearchEndpoint = Restangular.all('wordSearch');
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
      getLoginStats: function(){
        return  loginStatsEndpoint.customGET('');
      },
      getSearchWords: function(text){
        return  wordSearchEndpoint.customGET('', {'text' : text});
      }
    };
  });
