(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditDeductionMasterController: function(scope, resourceFactory, location,routeParams,webStorage,$modal) {
       
		  scope.categoryDatas=[];
		  scope.customerTypeDatas=[];
		  scope.deductionTypeDatas=[];
		  scope.businessDatas=[];
		  scope.stateData = [];
	    
		  resourceFactory.mastersResource.get({id: routeParams.id},function(data) {
			 // scope.masterData = data;
			 scope.formData = data;
			 scope.formData.circle = parseInt(data.circle);
			 scope.categoryDatas = data.levelApplicables;
			 scope.customerTypeDatas = data.customerTypes;
			 scope.deductionTypeDatas = data.deductionTypeData;
			 scope.businessDatas = data.businessCategory;
			 scope.stateData = data.stateDatas;
		  });
		  	  
		  
		  scope.cancel = function(){
	        	
			  webStorage.add("callingTab", {tab: "master" });
	      };

		  
		  scope.deleteDeduction = function(){
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
                  resourceFactory.mastersResource.delete({id: routeParams.id} , {} , function(data) {
                       location.path('/clients');
                       
                       webStorage.add("callingTab", {tab: "master"});
                       
                  });
                  $modalInstance.close('delete');
                          };
           $scope.cancel = function () {
               $modalInstance.dismiss('cancel');
           };
		   }            
		  
		  scope.submit = function(){
			 
			  delete scope.formData.deductionTypeData;
			  delete scope.formData.levelApplicables;
			  delete scope.formData.id;
			  delete scope.formData.customerTypes;
			  delete scope.formData.businessCategory;
			  delete scope.formData.stateDatas;
			  resourceFactory.mastersResource.update({id: routeParams.id},scope.formData,function(data){
	            	location.path('/clients');
	          });
			  
	            webStorage.add("callingTab", {tab: "master"});

		  };
/*			  scope.deleteaccount = function (){
		            resourceFactory.mediaSettlement.delete({mediaSettlementId: routeParams.id} , {} , function(data) {
		                  location.path('/game');
		                       
		            }); 
			  
		  };
*/	  }
  });
  mifosX.ng.application.controller('EditDeductionMasterController', ['$scope', 'ResourceFactory', '$location','$routeParams','webStorage','$modal', mifosX.controllers.EditDeductionMasterController]).run(function($log) {
    $log.info("EditDeductionMasterController initialized");
  });
}(mifosX.controllers || {}));
