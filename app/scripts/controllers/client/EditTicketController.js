(function(module) {
	mifosX.controllers = _.extend(module,{
		EditTicketController : function(scope,routeParams,resourceFactory, location, http) {
							scope.formData = {};	
							scope.data={};
							resourceFactory.editTicketResource.get({clientId: routeParams.clientId, id: routeParams.id} , function(data) {	
                                scope.formData=data;                            
								scope.statusTypes = data.statusType;
								scope.usersData = data.usersData;
								//scope.formData.status=14;
								scope.clientId=routeParams.clientId;
								scope.ticketId=routeParams.id;
							});		
							
							scope.onFileSelect = function($files) {
							        scope.file = $files[0];
							      };
							      
							scope.submit = function() {
								this.data.assignedTo=this.formData.userId;
								this.data.comments=this.formData.comments;
								this.data.status=this.formData.status;
						        http.uploadFile({
						          url: 'https://spark.openbillingsystem.com/obsplatform/api/v1/clients/'+routeParams.clientId+'/documents/'+routeParams.id+'/attachment', 
						          data: scope.data,
						          file: scope.file
						        }).then(function(data) {
						        	if (!scope.$$phase) {
						                scope.$apply();
						              }
						        	location.path('/viewTicket/'
											+ routeParams.clientId+'/'+routeParams.id);
						        });						      				
							};
						}
					});
	mifosX.ng.application.controller('EditTicketController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$http', mifosX.controllers.EditTicketController]).run(function($log) {
	    $log.info("EditTicketController initialized");
	  });
	
}(mifosX.controllers || {}));