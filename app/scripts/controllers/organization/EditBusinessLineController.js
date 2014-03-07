(function(module) {
	mifosX.controllers = _.extend(module,{
		EditBusinessLineController : function(scope,routeParams,resourceFactory,dateFilter, location) {
							scope.eventStatus = [];
							scope.chargeData = [];
							scope.availableServices = [];
							scope.allowed = [];
							scope.restricted = [];										
							scope.selectedServices = [];
							scope.formData = {};							
							scope.date = {};
							resourceFactory.businessLineEditResource.get({eventId: routeParams.id} , function(data) {								
                                scope.formData=data;                            
								scope.eventStatus = data.statusData;
								scope.availableServices = data.mediaAsset;
								scope.chargeData = data.chargeDatas;
								scope.selectedServices=data.selectedMedia;
								
								for ( var i in data.selectedMedia) {	
									 //alert('var i in data.selectedMedia'+data.selectedMedia[i].mediaId);
									for ( var j in data.mediaAsset) {	
										 //alert('var j in data.mediaAsset'+data.mediaAsset[j].mediaId);
										if (data.mediaAsset[j].mediaId == data.selectedMedia[i].categoryId) {																		
											scope.availableServices.splice(j, 1);
										}
									}
								}
								scope.restricted=data.selectedMedia;		
								
							});
							
							
							

							scope.restrict = function() {								
								for ( var i in this.allowed) {		
									 //alert('var i in this.allowed in restrick'+this.allowed[i]));
									for ( var j in scope.availableServices) {	
										// alert('var j scope.availableServices'+scope.availableServices[j].mediaId);
										if (scope.availableServices[j].mediaId == this.allowed[i]) {	
											
											var temp = {};
											temp.categoryId = this.allowed[i];
											temp.mediaTitle = scope.availableServices[j].mediaTitle;								
											scope.selectedServices.push(temp);
											scope.availableServices.splice(j, 1);
										}
									}
								}
							};
							scope.allow = function() {
								for ( var i in this.restricted) {
									 
									for ( var j in scope.selectedServices) {
										 
										if (scope.selectedServices[j].categoryId == this.restricted[i]) {
											
											var temp = {};
											temp.mediaId = this.restricted[i];
											temp.mediaTitle = scope.selectedServices[j].mediaTitle;									
											scope.availableServices.push(temp);
											scope.selectedServices.splice(j, 1);
										}
									}
								}
							};

							scope.submit = function() {
								
								this.formData.locale = 'en';
								this.formData.dateFormat = 'dd MMMM yyyy';
								
								this.formData.status=this.formData.statusId;
								
								delete this.formData.id;
								delete this.formData.statusData;
								delete this.formData.chargeDatas;
								delete this.formData.mediaAsset;
								//delete this.formData.optType;
								delete this.formData.selectedMedia;
								delete this.formData.statusId;
								var temp = [];
								for ( var i in scope.selectedServices) {
									temp[i] = scope.selectedServices[i].categoryId;
								}
								this.formData.categoryData = temp;
								resourceFactory.businessLineEditResource.update({eventId: routeParams.id},
										this.formData, function(data) {
											location.path('/businessline');
										});
							};
						}
					});
	mifosX.ng.application.controller('EditBusinessLineController', ['$scope', '$routeParams', 'ResourceFactory','dateFilter', '$location', mifosX.controllers.EditBusinessLineController]).run(function($log) {
	    $log.info("EditBusinessLineController initialized");
	  });
	
}(mifosX.controllers || {}));
