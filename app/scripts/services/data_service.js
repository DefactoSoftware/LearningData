'use strict';
angular.module('learningDataApp')
  .factory ('dataAPIservice', function( Restangular, $cookieStore ){

    var tenantStatsEndpoint = Restangular.all('tenant_stats');
    var dailyTenantStatsEndpoint = Restangular.all('daily_tenant_stats');
    var tenantsEndpoint = Restangular.all('tenants');
    var loginStatsEndpoint = Restangular.all('login_stats');
    var wordSearchEndpoint = Restangular.all('word_search');
    var loginEndpoint = Restangular.all('login');
    var spacesEndpoint = Restangular.all('spaces_stats');

    return {
      loginAPI: function(authenticationHeader) {
        return loginEndpoint.customGET('', {}, authenticationHeader);
      },
      getTenantStats: function(type, tenant, interval, fromDate, toDate){
        return tenantStatsEndpoint.customGET('', {'type[]' : type, 'tenant' : tenant, 'interval' : interval, 'fromDate' : fromDate, 'toDate' : toDate}, $cookieStore.get('authenticationHeader'));
      },
      getDailyTenantStats: function(){
        return  dailyTenantStatsEndpoint.customGET('', {}, $cookieStore.get('authenticationHeader'));
      },
       getTenants: function(){
        return  tenantsEndpoint.customGET('', {}, $cookieStore.get('authenticationHeader'));
      },
      getLoginStats: function(){
        return  loginStatsEndpoint.customGET('', {}, $cookieStore.get('authenticationHeader'));
      },
      getSearchWords: function(text){
        return  wordSearchEndpoint.customGET('', {'text' : text}, $cookieStore.get('authenticationHeader'));
      },
      getSpacesStats: function(){
        return  spacesEndpoint.customGET('', {}, $cookieStore.get('authenticationHeader'));
      }
    };
  });
