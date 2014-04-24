(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewPriceController: function(scope, routeParams , location,resourceFactory ) {
        scope.chargevariants = [];
        scope.planId=routeParams.planId;
        resourceFactory.getPriceResource.get({priceId: routeParams.id} , function(data) {
            scope.chargevariants = data.chargevariant;
            scope.serviceDatas =data.serviceData;
            scope.chargeDatas=data.chargeData;
            scope.priceRegionDatas=data.priceRegionData;
            scope.formData=data;
           
        });

        scope.deleteuser = function (){
            resourceFactory.deletePriceResource.delete({priceId: routeParams.id} , {} , function(data) {
                  location.path('/prices/'+routeParams.planId);
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    
    }
  });
  mifosX.ng.application.controller('ViewPriceController', ['$scope', '$routeParams', '$location','ResourceFactory', mifosX.controllers.ViewPriceController]).run(function($log) {
    $log.info("ViewPriceController initialized");
  });
}(mifosX.controllers || {}));
