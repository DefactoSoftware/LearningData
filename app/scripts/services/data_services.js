'use strict';
angular.module('learningDataApp')
  .factory ('dataAPIservice', function(Restangular){

    var tenantStatsEndpoint = Restangular.all('tenant_stats');
    var dailyTenantStatsEndpoint = Restangular.all('daily_tenant_stats');
    var tenantsEndpoint = Restangular.all('tenants');
    var loginStatsEndpoint = Restangular.all('login_stats');
    var wordSearchEndpoint = Restangular.all('word_search');
    return {
      getTenantStats: function(type, tenant, interval, fromDate, toDate){
        return tenantStatsEndpoint.customGET('', {'type[]' : type, 'tenant' : tenant, 'interval' : interval, 'fromDate' : fromDate, 'toDate' : toDate});
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
