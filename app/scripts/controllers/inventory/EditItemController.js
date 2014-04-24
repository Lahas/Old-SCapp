(function(module) {
  mifosX.controllers = _.extend(module, {
    EditItemController: function(scope, routeParams, resourceFactory, location) {
        scope.itemClassDatas = [];
        scope.unitDatas = [];
        scope.chargesDatas = [];
        
         resourceFactory.itemResource.get({itemId: routeParams.id} , function(data) {
        	scope.itemClassDatas = data.itemClassData;
            scope.unitDatas = data.unitData;
            scope.chargesDatas = data.chargesData;
            scope.formData=data;
           

        });
        
        scope.submit = function() {	
        	 delete this.formData.id;
        	 delete this.formData.itemClassData;
        	 delete this.formData.unitData;
        	 delete this.formData.chargesData;
        	 this.formData.locale = 'en';
               resourceFactory.itemResource.update({'itemId': routeParams.id},this.formData,function(data){
             location.path('/viewitem/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditItemController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.EditItemController]).run(function($log) {
    $log.info("EditItemController initialized");
  });
}(mifosX.controllers || {}));
