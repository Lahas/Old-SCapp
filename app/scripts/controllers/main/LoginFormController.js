(function(module) {
  mifosX.controllers = _.extend(module, {
    LoginFormController: function(scope,webStorage,resourceFactory,authenticationService ) {
      scope.loginCredentials = {};
      scope.authenticationFailed = false;
      scope.configs = [];
     
      
      scope.login = function() {
        authenticationService.authenticateWithUsernamePassword(scope.loginCredentials);
        /*resourceFactory.configurationResource.get(function(data) {
        
          	  for(var i in data.globalConfiguration){
                    scope.configs.push(data.globalConfiguration[i]);
                    webStorage.add("globalConfiguration", {
                    	name: data.globalConfiguration[i].name, 
                    	displayName:globalConfiguration[i].name});
                }
          	 
            });*/
      };
     
      scope.$on("UserAuthenticationFailureEvent", function(data) {
        scope.authenticationFailed = true;
      });

    }
  });
  mifosX.ng.application.controller('LoginFormController', ['$scope','webStorage','ResourceFactory', 'AuthenticationService', mifosX.controllers.LoginFormController]).run(function($log) {
    $log.info("LoginFormController initialized");
  });
}(mifosX.controllers || {}));
