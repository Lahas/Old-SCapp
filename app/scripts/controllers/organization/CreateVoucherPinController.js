(function(module) {
	  mifosX.controllers = _.extend(module, {
	    CreateVoucherPinController: function(scope, resourceFactory, location,dateFilter) {
	        scope.pinCategoryDatas = [];
	        scope.pinTypeDatas = [];
	        scope.start={};
	        scope.start.date = new Date();
	        resourceFactory.voucherpinTemplateResource.get(function(data) {
	            scope.pinCategoryDatas = data.pinCategoryData;
	            scope.pinTypeDatas = data.pinTypeData;
	            scope.formData = {
	            		
	            };
	        });
	        
	        scope.submit = function() {  
	        	 this.formData.locale = "en";
	             this.formData.dateFormat = "dd MMMM yyyy";
	             var exipiryDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	             this.formData.expiryDate=exipiryDate;
	             this.formData.pinExtention="Rs.";
	            resourceFactory.voucherpinResource.save(this.formData,function(data){
	            	location.path('/voucherpins');
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateVoucherPinController', ['$scope', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.CreateVoucherPinController]).run(function($log) {
	    $log.info("CreateVoucherPinController initialized");
	  });
	}(mifosX.controllers || {}));

