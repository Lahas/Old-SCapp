(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateTicketController: function(scope,webStorage, resourceFactory, location, translate,dateFilter,routeParams) {
            
			scope.priorityTypes = [];
			scope.formData={};						
			scope.problemsDatas = [];
			scope.usersDatas=[];
			 scope.start = {};
			 scope.start.date = new Date();
			 scope.clientId=routeParams.id;
			 var clientData = webStorage.get('clientData');
			    scope.displayName=clientData.displayName;
			    scope.statusActive=clientData.statusActive;
			    scope.accountNo=clientData.accountNo;
			    scope.officeName=clientData.officeName;
			    scope.balanceAmount=clientData.balanceAmount;
			    scope.currency=clientData.currency;
			    scope.imagePresent=clientData.imagePresent;
            resourceFactory.ticketResourceTemplate.get(function(data){ 
            	
              scope.date = data.ticketDate;
              scope.priorityTypes=data.priorityType;
              scope.problemsDatas=data.problemsDatas;
              scope.usersDatas=data.usersData;
            });                  
            
            scope.reset123 = function(){
         	   webStorage.add("callingTab", {someString: "Tickets" });
            };
           
			scope.submit = function() { 
				this.formData.locale = 'en';
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData.ticketDate = reqDate;
				this.formData.dateFormat = 'dd MMMM yyyy';
				this.formData.ticketTime = ' '+new Date().toLocaleTimeString().replace("IST","").trim();
                resourceFactory.ticketResource.save({'clientId': routeParams.id},this.formData,function(data){
                 location.path('/viewTicket/'+ routeParams.id+'/'+data.resourceId);
               });
         };
    }
  });
  mifosX.ng.application.controller('CreateTicketController', ['$scope', 'webStorage','ResourceFactory', '$location', '$translate','dateFilter', '$routeParams', mifosX.controllers.CreateTicketController]).run(function($log) {
    $log.info("CreateTicketController initialized");
  });
}(mifosX.controllers || {}));

