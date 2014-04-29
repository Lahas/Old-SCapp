(function(module) {
  mifosX.controllers = _.extend(module, {
	  PartnerDocumentController: function(scope,webStorage, location, http, routeParams) {
      scope.partnerId = routeParams.id;
      var partnerData = webStorage.get('partnerData');
      scope.partnerName=partnerData.partnerName;
  	  scope.partnerTypeName=partnerData.partnerTypeName;
  	  
  	  
  	  scope.formData={};
  	  scope.onFileSelect = function($files) {
      scope.file = $files[0];
  	  };
      scope.reset123 = function(){
      	   webStorage.add("callingTab", {someString: "documents" });
         };
      scope.submit = function () {
        http.uploadFile({
          url: 'https://'+document.location.host+'/obsplatform/api/v1/mediasettlements/document/'+scope.partnerId,
          data: scope.formData,
          file: scope.file
        }).then(function(data) {
          // to fix IE not refreshing the model
          if (!scope.$$phase) {
            scope.$apply();
          }
          location.path('/viewpartneraccount/'+scope.partnerId);
        });
        webStorage.add("callingTab", {someString: "documents" });
      };
    }
  });
  mifosX.ng.application.controller('PartnerDocumentController', ['$scope','webStorage', '$location', '$http', '$routeParams', mifosX.controllers.PartnerDocumentController]).run(function($log) {
    $log.info("PartnerDocumentController initialized"); 
  });
}(mifosX.controllers || {}));