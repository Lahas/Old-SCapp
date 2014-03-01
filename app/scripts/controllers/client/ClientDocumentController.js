(function(module) {
  mifosX.controllers = _.extend(module, {
    ClientDocumentController: function(scope,webStorage, location, http, routeParams) {
      scope.clientId = routeParams.clientId;
      var clientData = webStorage.get('clientData');
      scope.displayName=clientData.displayName;
      scope.statusActive=clientData.statusActive;
      scope.accountNo=clientData.accountNo;
      scope.officeName=clientData.officeName;
      scope.balanceAmount=clientData.balanceAmount;
      scope.currency=clientData.currency;
      scope.imagePresent=clientData.imagePresent;
      scope.onFileSelect = function($files) {
        scope.file = $files[0];
      };

      scope.reset123 = function(){
      	   webStorage.add("callingTab", {someString: "documents" });
         };
      scope.submit = function () {
        http.uploadFile({
          url: 'https://'+document.location.host+'/obsplatform/api/v1/clients/'+scope.clientId+'/documents', 
          data: scope.formData,
          file: scope.file
        }).then(function(data) {
          // to fix IE not refreshing the model
          if (!scope.$$phase) {
            scope.$apply();
          }
          location.path('/viewclient/'+scope.clientId);
        });
        webStorage.add("callingTab", {someString: "documents" });
      };
    }
  });
  mifosX.ng.application.controller('ClientDocumentController', ['$scope','webStorage', '$location', '$http', '$routeParams', mifosX.controllers.ClientDocumentController]).run(function($log) {
    $log.info("ClientDocumentController initialized"); 
  });
}(mifosX.controllers || {}));