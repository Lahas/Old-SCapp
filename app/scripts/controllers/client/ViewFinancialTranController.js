(function(module) {
    mifosX.controllers = _.extend(module, {
    	ViewFinancialTranController: function(scope,webStorage, routeParams, route, resourceFactory,http) {
    		
    		scope.invoicedetails = [];
            scope.formData={};
            scope.transactionId = routeParams.transactionId;
            scope.clientId=routeParams.clientId;
            var clientData = webStorage.get('clientData');
            scope.displayName=clientData.displayName;
            scope.statusActive=clientData.statusActive;
            scope.accountNo=clientData.accountNo;
            scope.officeName=clientData.officeName;
            scope.balanceAmount=clientData.balanceAmount;
            scope.currency=clientData.currency;
            scope.imagePresent=clientData.imagePresent;
            resourceFactory.financialResource.getAllDetails({'transactionId': routeParams.transactionId},function(data){
                scope.invoicedetails = data.transactionsDatas;
            }); 
        }
    });
    mifosX.ng.application.controller('ViewFinancialTranController', ['$scope','webStorage','$routeParams','$route', 'ResourceFactory', '$http', mifosX.controllers.ViewFinancialTranController]).run(function($log) {
        $log.info("ViewFinancialTranController initialized");
    });
}(mifosX.controllers || {}));



