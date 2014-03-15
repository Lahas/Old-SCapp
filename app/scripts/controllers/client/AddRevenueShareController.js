(function(module) {
	  mifosX.controllers = _.extend(module, {
		  AddRevenueShareController: function(scope, resourceFactory, location,dateFilter,routeParams) {
	        scope.discountTypeDatas = [];
	        scope.statuses = [];
	        scope.start = {};
	        scope.percentageData = {};
			scope.revenueData = [];
			
			scope.formData = {};
			scope.clientId = routeParams.id;
			scope.start.date = new Date();
	        scope.showPercentage = false;
	        scope.showFlat = false;
	        
	        
	        resourceFactory.revenueResourceTemplate.get(function(data) {
				
				  scope.businessLineDatas = data.businessLineData;
				  scope.mediaCategoryDatas = data.mediaCategoryData;
				  scope.royaltyTypeDatas = data.royatyTypeData;
			  });
	        
	        
	        scope.addPercentage = function(){
	        	scope.counter = scope.counter+1;
	        	scope.revenueData.push({
												startValue : scope.percentageData.startValue,
												endValue : scope.percentageData.endValue,
												percentage : scope.percentageData.percentage,
												locale : 'en' 
											});
	        	console.log("now : "+scope.percentageData.overwriteRoyaltyValue);
	        	scope.percentageData.startValue = undefined;
				scope.percentageData.endValue = undefined;
				scope.percentageData.percentage = undefined;
				scope.percentageData.locale = undefined;

	        };
	        
	        scope.setView = function(data){
	        	for(i in scope.royaltyTypeDatas){
	        		if(scope.royaltyTypeDatas[i].id == data && 'Percentage' == scope.royaltyTypeDatas[i].mCodeValue){
	        			scope.showPercentage = true;
	        			scope.showFlat = false;
	        			scope.revenueData = [];
	        			delete scope.formData.flat;
	        		}else if(scope.royaltyTypeDatas[i].id == data && 'Flat Rate' == scope.royaltyTypeDatas[i].mCodeValue){
	        			scope.showPercentage = false;
	        			scope.showFlat = true;
	        			scope.revenueData=[];
	        			scope.formData.flat = undefined;
	        		}
	        	}
	        };
	        
	        scope.removePercentage = function(index){	
	        	if(scope.counter>=1){
	        		scope.counter = scope.counter-1;
	        	}
	        	scope.revenueData.splice(index,1);
	        	//console.log("Remove Game Media: "+scope.counter);	
	        };
	        
	        scope.submit = function(){
				  scope.formData.percentageParams = new Array();
				  if(scope.revenueData.length>0){
		        		for(var i in scope.revenueData){
		        			//console.log("i: "+i);
		        			scope.formData.percentageParams.push({
								startValue : scope.revenueData[i].startValue,
								endValue : scope.revenueData[i].endValue,
								percentage : scope.revenueData[i].percentage,
								locale : "en"
		        			});
		        		}
		        	}
				  scope.formData.clientId = scope.clientId;
				  scope.formData.locale = 'en';
				  resourceFactory.revenueResource.save({clientId : routeParams.id}, this.formData, function(data){
					  location.path('/viewclient/'+routeParams.id);
		            });
	        };
	        
	        /*scope.submitFlatData = function(){
				  scope.formData.percentageParams = new Array();
				  scope.formData.locale = 'en';
				  delete this.startValue;
				  delete this.endValue;
				  delete this.percentage;
				  resourceFactory.revenueResource.save({clientId : routeParams.id}, this.formData, function(data){
					  location.path('/viewclient/'+routeParams.id);
		            });
	        };*/
	      
	    }
	  });
	  mifosX.ng.application.controller('AddRevenueShareController', ['$scope', 'ResourceFactory', '$location','dateFilter','$routeParams', mifosX.controllers.AddRevenueShareController]).run(function($log) {
	    $log.info("AddRevenueShareController initialized");
	  });
	}(mifosX.controllers || {}));

