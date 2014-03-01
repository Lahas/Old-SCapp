(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewStatementController: function(scope,webStorage, routeParams , route, location, resourceFactory, http) {
		 // alert("hh");
        scope.statementDatas = [];    
        scope.id=routeParams.id;
        scope.clientId=routeParams.clientId;
        var clientData = webStorage.get('clientData');
        scope.displayName=clientData.displayName;
        scope.statusActive=clientData.statusActive;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        resourceFactory.singleStatementResource.get({billId: routeParams.id} , function(data) {
        	
            scope.statementDatas = data;
        });
        
        
        

 scope.downloadFile = function (){
	 
     window.open('https://spark.openbillingsystem.com/obsplatform/api/v1/billmaster/'+routeParams.id+'/print?tenantIdentifier=default');
};
       
    }
  });
  mifosX.ng.application.controller('ViewStatementController', ['$scope','webStorage', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.ViewStatementController]).run(function($log) {
    $log.info("ViewStatementController initialized");
  });
}(mifosX.controllers || {}));