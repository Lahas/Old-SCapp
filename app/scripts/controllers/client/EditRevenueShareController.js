(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditRevenueShareController: function(scope, resourceFactory, location,dateFilter,routeParams,webStorage,$modal) {
	        scope.discountTypeDatas = [];
	        scope.statuses = [];
	        scope.start={};
	        scope.percentageData = {};
			scope.revenueData=[];
			scope.formData={};
			scope.showFlat = false;
			scope.showPercentage = false;
	        scope.start.date = new Date();
	        
	        resourceFactory.revenueResourceEdit.get({id : routeParams.id},function(data) {
	        	  scope.formData = data;
				//  scope.businessLineDatas=data.businessLineData;
	        	  scope.deductionMasterDatas = data.deductionMasterData;
				  scope.mediaCategoryDatas=data.mediaCategoryData;
				  scope.royaltyTypeDatas = data.royaltyTypeData;
				  scope.revenueData=data.percentageDatas;
				  if(scope.revenueData.length>0){
					  if(scope.revenueData[0].flat>0){
						  scope.showFlat = true;
						  scope.formData.flat = scope.revenueData[0].flat;
						  scope.showPercentage = false;
						  scope.revenueData=[];
						  scope.formData.revenueShareTypeStr='Flat';
					  }else{
						  scope.showPercentage = true;
						  scope.showFlat = false;
						  scope.formData.revenueShareTypeStr='Percentage';
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
	        			scope.formData.revenueShareTypeStr='Percentage';
	        			/*scope.revenueData = [];
	        			delete scope.formData.flat;*/
	        		}else if(scope.royaltyTypeDatas[i].id == data && 'Flat' == scope.royaltyTypeDatas[i].mCodeValue){
	        			scope.showFlat = true;
	        			scope.showPercentage = false;
	        			scope.formData.revenueShareTypeStr='Flat';
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
	        
	        scope.cancel=function(){
				  webStorage.add("callingTab", {someString: "revenueShare" });
			  };
	  
	        scope.submit = function(){
	        	console.log(scope.revenueData.length);
	        	delete scope.formData.id;
	        	/*delete scope.formData.clientId;*/
	        	delete scope.formData.mediaCategoryData;
	        	delete scope.formData.deductionMasterData;
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
				 // scope.formData.revenueShareTypeStr=scope.revenueShareTypeStr;
				  resourceFactory.revenueResource.update({clientId : routeParams.id}, this.formData, function(data){
					  location.path('/viewclient/'+scope.formData.clientId);
		            });
				  webStorage.add("callingTab", {someString: "revenueShare" });
	        }; 
	        
	        scope.deleteRevenue = function(){
	    	    $modal.open({
	    		  	templateUrl: 'approve.html',
	              	controller: Approve,
	              	resolve:{}
	          	});
		  };
	       
	        var Approve= function($scope, $modalInstance){
	 		   $scope.approve = function () {
	 		//  scope.approveData = {};
	 			   //$modalInstance.close('delete');
	                   resourceFactory.revenueResource.delete({clientId: routeParams.id} , {} , function(data) {
	                        location.path('/viewclient/' +scope.formData.clientId);
	                        
	                   });
	                   $modalInstance.close('delete');
	                           };
	            $scope.cancel = function () {
	                $modalInstance.dismiss('cancel');
	            };
	        }
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
	  mifosX.ng.application.controller('EditRevenueShareController', ['$scope', 'ResourceFactory', '$location','dateFilter','$routeParams','webStorage','$modal', mifosX.controllers.EditRevenueShareController]).run(function($log) {
	    $log.info("EditRevenueShareController initialized");
	  });
	}(mifosX.controllers || {}));

