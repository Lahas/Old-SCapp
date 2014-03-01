(function(module) {
  mifosX.controllers = _.extend(module, {
	  PartnerAgreementController: function(scope,location, resourceFactory,route) {
        scope.partnerAgreements = [];
        
       
        	resourceFactory.partnerAgreementResource.getAllfiles(function(data) {
                scope.partnerAgreements= data.partnerAgreementDatas;
            });
       
        	 scope.routeTo = function(id){
                 location.path('/editPartnerAgreement/'+ id);
                 
               };
        	
        	scope.downloadFile = function (id){ 
           	 window.open('https://'+document.location.host+'/obsplatform/api/v1/mediasettlements/'+id+'/print?tenantIdentifier=default');
        	};
    }
  });
  mifosX.ng.application.controller('PartnerAgreementController', ['$scope','$location', 'ResourceFactory','$route', mifosX.controllers.PartnerAgreementController]).run(function($log) {
    $log.info("PartnerAgreementController initialized");
  });
}(mifosX.controllers || {}));
