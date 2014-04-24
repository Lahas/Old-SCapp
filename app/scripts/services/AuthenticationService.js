(function(module) {
  mifosX.services = _.extend(module, {
    AuthenticationService: function(scope, httpService,resourceFactory,webStorage) {
      var onSuccess = function(data) {
        scope.$broadcast("UserAuthenticationSuccessEvent", data);
        resourceFactory.configurationResource.get(function(data) {
        	for(var i in data.globalConfiguration){
                if(data.globalConfiguration[i].name=="DateFormat"){
                	webStorage.add("dateFormater",data.globalConfiguration[i].value);
                }
            }
           
        });
      };

      var onFailure = function(data) {
        scope.$broadcast("UserAuthenticationFailureEvent", data);
        
      };

      var apiVer = '/obsplatform/api/v1';

      this.authenticateWithUsernamePassword = function(credentials) {
        scope.$broadcast("UserAuthenticationStartEvent");
        httpService.post(apiVer + "/authentication?username="+ credentials.username+ "&password=" + credentials.password)
          .success(onSuccess)
          .error(onFailure);
      };
    }
  });
  mifosX.ng.services.service('AuthenticationService', ['$rootScope', 'HttpService','ResourceFactory','webStorage', mifosX.services.AuthenticationService]).run(function($log) {
    $log.info("AuthenticationService initialized");
  });
}(mifosX.services || {}));
