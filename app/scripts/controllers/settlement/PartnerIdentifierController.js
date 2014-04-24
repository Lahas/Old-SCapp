(function(module) {
    mifosX.controllers = _.extend(module, {
    	PartnerIdentifierController: function(scope,webStorage, routeParams , location, resourceFactory) {
            scope.partnerId = routeParams.id;
           // console.log(partnerId);
            var partnerData = webStorage.get('partnerData');
            scope.partnerName=partnerData.partnerName;
        	scope.partnerTypeName=partnerData.partnerTypeName;
            
            
            scope.formData = {};
            scope.documenttypes = [];
            resourceFactory.partnerIdenfierTemplateResource.get({partnerId: routeParams.id}, function(data) {
                scope.documenttypes = data.allowedDocumentTypes;
                scope.formData.documentTypeId = data.allowedDocumentTypes[0].id;
            });

            scope.reset123 = function(){
  	    	   webStorage.add("callingTab", {someString: "identities" });
  	       };
            scope.submit = function () {
                resourceFactory.partnerIdentifierResource.save({partnerId: scope.partnerId},this.formData,function(data){
                    location.path('/viewpartneraccount/' + data.partnerId);
                });
                webStorage.add("callingTab", {someString: "identities" });
            };

        }
    });
    mifosX.ng.application.controller('PartnerIdentifierController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.PartnerIdentifierController]).run(function($log) {
        $log.info("PartnerIdentifierController initialized");
    });
}(mifosX.controllers || {}));

