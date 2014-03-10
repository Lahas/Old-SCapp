(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditRevenueShareController: function(scope, resourceFactory, location,dateFilter,routeParams) {
	        scope.discountTypeDatas = [];
	        scope.statuses = [];
	        scope.start={};
	        scope.percentageData = {};
			scope.revenueData=[];
			//scope.clientId=routeParams.id;
			scope.formData={};
			scope.showFlat = false;
			scope.showPercentage = false;
	        scope.start.date = new Date();
	        
	        resourceFactory.revenueResourceEdit.get({id : routeParams.id},function(data) {
				
	        	  scope.formData = data;
				  scope.businessLineDatas=data.businessLineData;
				  scope.mediaCategoryDatas=data.mediaCategoryData;
				  scope.royaltyTypeDatas = data.royaltyTypeData;
				  scope.revenueData=data.percentageDatas;
				  if(scope.revenueData.length>0){
					  if(scope.revenueData[0].flat>0){
						  scope.showFlat = true;
						  scope.formData.flat = scope.revenueData[0].flat;
						  scope.showPercentage = false;
					  }else{
						  scope.showPercentage = true;
						  scope.showFlat = false;
					  }
				  }
				  /*scope.formData.businessLine = data.businessLine;
				  scope.formData.mediaCategory = data.mediaCategory;
				  scope.formData.revenueShareType = data.revenueShareType;*/
				  /*scope.formData.businessLine=data.percentageDatas[0].businessLine;
				  scope.formData.mediaCategory=data.percentageDatas[0].mediaCategory;
				  scope.formData.revenueShareType=data.percentageDatas[0].revenueShareType;*/
			  });
	        
	        
	        scope.setView = function(data){
	        	console.log(data);
	        	for(i in scope.royaltyTypeDatas){
	        		if(scope.royaltyTypeDatas[i].id == data && 'Percentage' == scope.royaltyTypeDatas[i].mCodeValue){
	        			scope.showPercentage = true;
	        			scope.showFlat = false;
	        			/*scope.revenueData = [];
	        			delete scope.formData.flat;*/
	        		}else if(scope.royaltyTypeDatas[i].id == data && 'Flat Rate' == scope.royaltyTypeDatas[i].mCodeValue){
	        			scope.showPercentage = false;
	        			scope.showFlat = true;
	        			/*scope.revenueData=[];
	        			scope.formData.flat = undefined;*/
	        		}
	        	}
	        };
	        
	        scope.clearPercentageData = function(){
	        	console.log("clearPercentageData");
	        	scope.revenueData = [];
	        	scope.formData.flat;
	        };
	        
	        scope.clearFlatData = function(){
	        	console.log("clearFlatData");
	        	delete scope.formData.flat;
	        };
	        
	        scope.addPercentage = function(){
	        	scope.counter = scope.counter+1;
	        	scope.revenueData.push({
												startValue : scope.percentageData.startValue,
												endValue : scope.percentageData.endValue,
												percentage : scope.percentageData.percentage,
												locale : 'en' 
											});
	        	
	        	scope.percentageData.startValue = undefined;
				scope.percentageData.endValue = undefined;
				scope.percentageData.percentage = undefined;
				scope.percentageData.locale = 'en';

	        };
	        
	        scope.removePercentage = function(index){	
	        	if(scope.counter>=1){
	        		scope.counter = scope.counter-1;
	        	}
	        	scope.revenueData.splice(index,1);
	        	//console.log("Remove Game Media: "+scope.counter);	
	        };
	        
	       
	        scope.submit = function(){
	        	
	        	delete scope.formData.id;
	        	/*delete scope.formData.clientId;*/
	        	delete scope.formData.mediaCategoryData;
	        	delete scope.formData.businessLineData;
	        	delete scope.formData.royaltyTypeData;
	        	delete scope.formData.percentageDatas;
	        	
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
				  scope.formData.locale = 'en';
				  resourceFactory.revenueResource.update({clientId : routeParams.id}, this.formData, function(data){
					  location.path('/viewclient/'+scope.formData.clientId);
		            });
	        }; 
	        /*scope.submitPercentageData = function(){
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
				  scope.formData.locale = 'en';
				  delete this.flat;
				  resourceFactory.revenueResource.save({clientId : routeParams.id}, this.formData, function(data){
					  location.path('/viewclient/'+routeParams.id);
		            });
	        };*/
	        
	     /*   scope.submitFlatData = function(){
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
	  mifosX.ng.application.controller('EditRevenueShareController', ['$scope', 'ResourceFactory', '$location','dateFilter','$routeParams', mifosX.controllers.EditRevenueShareController]).run(function($log) {
	    $log.info("EditRevenueShareController initialized");
	  });
	}(mifosX.controllers || {}));

