(function(module) {
    mifosX.controllers = _.extend(module, {
        ClientIdentifierController: function(scope,webStorage, routeParams , location, resourceFactory) {
            scope.clientId = routeParams.clientId;
            var clientData = webStorage.get('clientData');
            scope.displayName=clientData.displayName;
            scope.statusActive=clientData.statusActive;
            scope.accountNo=clientData.accountNo;
            scope.officeName=clientData.officeName;
            scope.balanceAmount=clientData.balanceAmount;
            scope.currency=clientData.currency;
            scope.imagePresent=clientData.imagePresent;
            
            scope.formData = {};
            scope.documenttypes = [];
            resourceFactory.clientIdenfierTemplateResource.get({clientId: routeParams.clientId}, function(data) {
                scope.documenttypes = data.allowedDocumentTypes;
                scope.formData.documentTypeId = data.allowedDocumentTypes[0].id;
            });

            scope.reset123 = function(){
  	    	   webStorage.add("callingTab", {someString: "identities" });
  	       };
            scope.submit = function () {
                resourceFactory.clientIdenfierResource.save({clientId:scope.clientId},this.formData,function(data){
                    location.path('/viewclient/' + data.clientId);
                });
                webStorage.add("callingTab", {someString: "identities" });
            };

        }
    });
    mifosX.ng.application.controller('ClientIdentifierController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.ClientIdentifierController]).run(function($log) {
        $log.info("ClientIdentifierController initialized");
    });
}(mifosX.controllers || {}));

