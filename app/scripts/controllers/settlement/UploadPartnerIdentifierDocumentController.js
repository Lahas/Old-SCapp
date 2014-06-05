(function(module) {
  mifosX.controllers = _.extend(module, {
	  UploadPartnerIdentifierDocumentController: function(scope, location, http, routeParams,webStorage) {
      scope.partnerId = routeParams.id;
      //console.log(routeParams);
      
      var partnerData = webStorage.get('partnerData');
        scope.partnerName=partnerData.partnerName;
        scope.partnerTypeName=partnerData.partnerTypeName;
  	    scope.status=partnerData.status;
  	    
      scope.resourceId = routeParams.resourceId;
      scope.onFileSelect = function($files) {
      scope.file = $files[0];
      };

      scope.submit = function () {
        http.uploadFile({
          url: 'https://'+document.location.host+'/obsplatform/api/v1/partner_identifiers/'+scope.resourceId+'/documents', 
          data: scope.formData,
          file: scope.file
        }).then(function(data) {
          // to fix IE not refreshing the model
          if (!scope.$$phase) {
            scope.$apply();
          }
          location.path('/viewpartneraccount/'+scope.partnerId);
        });
        webStorage.add("callingTab", {someString: "identities" });
      };
    }
  });
  mifosX.ng.application.controller('UploadPartnerIdentifierDocumentController', ['$scope', '$location', '$http', '$routeParams','webStorage', mifosX.controllers.UploadPartnerIdentifierDocumentController]).run(function($log) {
    $log.info("UploadPartnerIdentifierDocumentController initialized"); 
  });
}(mifosX.controllers || {}));