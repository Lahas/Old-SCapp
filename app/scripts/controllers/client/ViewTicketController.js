(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewTicketController: function(scope,webStorage, routeParams , route, location, resourceFactory, http) {
        scope.ticket = [];   
        var clientData = webStorage.get('clientData');
        scope.displayName=clientData.displayName;
        scope.statusActive=clientData.statusActive;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        resourceFactory.ticketResource.get({id: routeParams.id,clientId: routeParams.clientId} , function(data) {      	
            scope.ticket = data; 
            scope.clientId= routeParams.clientId;
        });
        resourceFactory.ticketHistoryResource.get({id: routeParams.id} , function(data) {  
            scope.historyData = data.masterData;
            scope.problemDescription=data.problemDescription;
        });
        
        scope.setData= function(){
        	
        };
        
        scope.deletemessage = function (){
            resourceFactory.messageSaveResource.delete({messageId: routeParams.id} , {} , function(data) {
                  location.path('/tickets/'+routeParams.clientId);
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewTicketController', ['$scope', 'webStorage','$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.ViewTicketController]).run(function($log) {
    $log.info("ViewTicketController initialized");
  });
}(mifosX.controllers || {}));
