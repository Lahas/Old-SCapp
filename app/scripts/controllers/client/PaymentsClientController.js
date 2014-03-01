(function(module) {
  mifosX.controllers = _.extend(module, {
	  PaymentsClientController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter) {

        scope.formData = {};
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
	    scope.displayName=clientData.displayName;
	    scope.statusActive=clientData.statusActive;
	    scope.accountNo=clientData.accountNo;
	    scope.officeName=clientData.officeName;
	    scope.balanceAmount=clientData.balanceAmount;
	    scope.currency=clientData.currency;
	    scope.imagePresent=clientData.imagePresent;
        //scope.datass = {};
        scope.start={};
         scope.start.date = new Date();
        resourceFactory.paymentsTemplateResource.getPayments(function(data){
          scope.payments = data;
          scope.data = data.data;
       
          
        //  scope.formData.destinationOfficeId = scope.offices[0].id;  
        });

        scope.submit = function() {
          this.formData.locale = "en";
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.paymentDate= paymentDate;
         
          resourceFactory.paymentsResource.save({clientId : routeParams.id}, this.formData, function(data){
            location.path('/viewclient/'+routeParams.id);
          });
        };

    }
  });
  mifosX.ng.application.controller('PaymentsClientController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter', mifosX.controllers.PaymentsClientController]).run(function($log) {
    $log.info("PaymentsClientController initialized");
  });
}(mifosX.controllers || {}));
