(function(module) {
    mifosX.controllers = _.extend(module, {
    	PartnerIdentifierController: function(scope,webStorage, routeParams , location, resourceFactory) {
            scope.partnerId = routeParams.id;
          // console.log(scope.partnerId);
            var partnerData = webStorage.get('partnerData');
            scope.partnerName=partnerData.partnerName;
        	scope.partnerTypeName=partnerData.partnerTypeName;
            
            
            scope.formData = {};
            scope.documenttypes = [];
            resourceFactory.partnerIdenfierTemplateResource.get( function(data) {
                scope.documenttypes = data.partnerIdentifierData;
                scope.formData.documentTypeId = data.partnerIdentifierData[0].id;
            });

            scope.reset123 = function(){
  	    	   webStorage.add("callingTab", {someString: "identities" });
  	       };
            scope.submit = function () {
                resourceFactory.partnerIdenfierResource.save({partnerId: scope.partnerId},this.formData,function(data){
                    location.path('/viewpartneraccount/' +scope.partnerId);
                });
                webStorage.add("callingTab", {someString: "identities" });
            };

        }
    });
    mifosX.ng.application.controller('PartnerIdentifierController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.PartnerIdentifierController]).run(function($log) {
        $log.info("PartnerIdentifierController initialized");
    });
}(mifosX.controllers || {}));

