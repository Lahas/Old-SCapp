(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditJobParameters: function(scope, routeParams, resourceFactory, location,dateFilter) {
		  
		  scope.reportDatas =[];
		  scope.billingMessageDatas=[];
		  scope.jobparameters=[];
		  scope.formData=[];
		  scope.date={};
		//  scope.start.date = new Date();
		  scope.date.processDate = new Date();
	        scope.date.dueDate = new Date();
	        scope.date.exipiryDate = new Date();
      resourceFactory.jobsparameters.get({jobId : routeParams.id}, function(data) {
        scope.reportDatas = data.queryData;
        scope.billingMessageDatas=data.billingMessageDatas;
        scope.jobparameters=data.jobparameters;
        scope.formData=data;
        var actDate = dateFilter(scope.jobparameters.processDate,'dd MMMM yyyy');
        scope.date.processDate = new Date(actDate);
        
        var dueDate = dateFilter(scope.jobparameters.dueDate,'dd MMMM yyyy');
        scope.date.dueDate = new Date(dueDate);
        
        var exipiryDate= dateFilter(scope.jobparameters.exipiryDate,'dd MMMM yyyy');
        scope.date.exipiryDate = new Date(exipiryDate);
       
        if(data.jobparameters.isDynamic=="Y"){
        	scope.formData.isDynamic=true;
        }
      
      });
       
      scope.cancel = function() {
        location.path('/viewschedulerjob/'+routeParams.id);
      }; 

      scope.submit = function() {
    	  
    	  this.formData.jobName=this.formData.name;
    	  this.formData.dateFormat = 'dd MMMM yyyy';
    	  this.formData.locale = 'en';
    	  this.formData.reportName=this.formData.jobparameters.batchName;
    	  this.formData.messageTempalate=this.formData.jobparameters.messageTempalate;
    	  
    	  if(this.formData.name == "Invoice"){this.formData.processDate = dateFilter(scope.date.processDate,'dd MMMM yyyy');}
    	  if(this.formData.name== "Generate Statment"){this.formData.dueDate = dateFilter(scope.date.dueDate,'dd MMMM yyyy');}
    	  if(this.formData.name== "Auto Exipiry"){this.formData.exipiryDate = dateFilter(scope.date.exipiryDate,'dd MMMM yyyy');}
         
      delete this.formData.jobId;
   	  delete this.formData.displayName;
   	  delete this.formData.name;
   	  delete this.formData.cronExpression;
   	  delete this.formData.cronDescription;
   	  delete this.formData.active;
   	  delete this.formData.currentlyRunning;
   	  delete this.formData.lastRunHistory;
   	  delete this.formData.queryData;
   	  delete this.formData.jobparameters;
   	  delete this.formData.nextRunTime;
   	  
          
        resourceFactory.jobsparameters.update({jobId: routeParams.id}, this.formData, function(data){
          location.path('/viewschedulerjob/'+data.resourceId);
        });
      };
    }
  });
  mifosX.ng.application.controller('EditJobParameters', ['$scope', '$routeParams', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.EditJobParameters]).run(function($log) {
    $log.info("EditJobParameters initialized");
  });
}(mifosX.controllers || {}));
