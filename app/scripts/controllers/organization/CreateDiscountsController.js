(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateDiscountsController: function(scope, resourceFactory, location,dateFilter) {
	        scope.discountTypeDatas = [];
	        scope.statuses = [];
	        scope.start={};
	        scope.start.date = new Date();
	        resourceFactory.discountTemplateResource.get(function(data) {
	            scope.discountTypeDatas = data.discounTypeData;
	            scope.statuses = data.status;
	            scope.formData = {
	            		
	            };
	        });
	        
	        scope.submit = function() {  
	        	 this.formData.locale = "en";
	             this.formData.dateFormat = "dd MMMM yyyy";
	             var startDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	         //    this.formData.paymentDate= startDate;
	             this.formData.startDate=startDate;
	            resourceFactory.discountResource.save(this.formData,function(data){
	            	location.path('/viewdiscounts/'+data.resourceId);
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateDiscountsController', ['$scope', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.CreateDiscountsController]).run(function($log) {
	    $log.info("CreateDiscountsController initialized");
	  });
	}(mifosX.controllers || {}));

