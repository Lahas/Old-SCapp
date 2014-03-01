(function(module) {
  mifosX.controllers = _.extend(module, {
	  AdjustmentClientController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter) {

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
        resourceFactory.adjustmentTemplateResource.get(function(data){
          scope.discountOptions = data.discountOptions;
          scope.data = data.data;
          scope.formData.adjustment_type = scope.discountOptions[0].discountType;
         
        //  scope.formData.destinationOfficeId = scope.offices[0].id;  
        });

        scope.submit = function() {
          this.formData.locale = "en";
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var adjustmentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.adjustment_date = adjustmentDate;
         // this.formData.adjustment_type = "CREDIT";
          resourceFactory.adjustmentResource.save({clientId : routeParams.id}, this.formData, function(data){
            location.path('/viewclient/'+routeParams.id);
          });
        };

    }
  });
  mifosX.ng.application.controller('AdjustmentClientController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter', mifosX.controllers.AdjustmentClientController]).run(function($log) {
    $log.info("AdjustmentClientController initialized");
  });
}(mifosX.controllers || {}));
