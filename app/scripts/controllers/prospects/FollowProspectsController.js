(function(module) {
  mifosX.controllers = _.extend(module, {
	  FollowProspectsController: function(scope, resourceFactory, location, routeParams,dateFilter) {
        
		  scope.assignedToDatas = [];
		  scope.callStatusDatas = [];
		  scope.prospectsData={};
		  scope.formData = {};
		  scope.first = {};
		  scope.first.date = new Date();
		  scope.first.time = scope.first.date.getHours()+":"+scope.first.date.getMinutes();
		  
		  scope.minDate = new Date();
		  
		  $('#timepicker1').timepicker({
			  showMeridian:false
		  });
		  

        resourceFactory.prospectResource.getDetails({clientProspectId : routeParams.id}, function(data) {
        	//alert(routeParams.id);
            scope.assignedToDatas = data.assignedToData;
            scope.callStatusDatas = data.callStatusData;
            scope.prospectsData.id=routeParams.id;
             
        });
        
        
        
        
        
        scope.submit = function() {
        	this.formData.locale="en";
        	var reqDate = dateFilter(scope.first.date,'yyyy-MM-dd');
        	this.formData.preferredCallingTime = reqDate+" "+$('#timepicker1').val()+":00";
          resourceFactory.prospectTemplateResource.update({clientProspectId: routeParams.id}, this.formData,function(data){
            location.path('/viewprospects/'+data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('FollowProspectsController', ['$scope', 'ResourceFactory', '$location', '$routeParams','dateFilter', mifosX.controllers.FollowProspectsController]).run(function($log) {
    $log.info("FollowProspectsController initialized");
  });
}(mifosX.controllers || {}));
