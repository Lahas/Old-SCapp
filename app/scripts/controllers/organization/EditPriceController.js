(function(module) {
  mifosX.controllers = _.extend(module, {
    EditPriceController: function(scope, routeParams, resourceFactory, location) {
        scope.serviceDatas = [];
        scope.chargeDatas= [];
        scope.chargevariants=[];
        scope.discountdatas=[];
        scope.priceRegionDatas=[];
        resourceFactory.getPriceResource.get({priceId: routeParams.id, template: 'true'} , function(data) {
            scope.formData = data;
            scope.planId = data.id;
            scope.serviceDatas = data.serviceData;
            scope.chargeDatas= data.chargeData;
            scope.priceRegionDatas=data.priceRegionData;
            scope.chargevariants=data.chargevariant;
            scope.discountdatas=data.discountdata;


        });
       
        
        scope.submit = function() {
        	
        //	this.formData.chargeCode=this.formData.chargeId;
        	this.formData.chargevariant=this.formData.chargeVariantId;
        	this.formData.serviceCode=scope.serviceDatas[0].serviceCode;//this.formData.serviceId;
        	
        	this.formData.locale = 'en';
             delete this.formData.chargeData; 
             delete this.formData.serviceData;
             delete this.formData.discountdata; 
             delete this.formData.priceRegionData;
             delete this.formData.planId;
             delete this.formData.serviceId;
             delete this.formData.chargeId;
             delete this.formData.chargeVariantId;
             delete this.formData.priceId;
            
             
             
             
             resourceFactory.getPriceResource.update({'priceId':routeParams.id},this.formData,function(data){
             location.path('/viewprice/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditPriceController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.EditPriceController]).run(function($log) {
    $log.info("EditPriceController initialized");
  });
}(mifosX.controllers || {}));

