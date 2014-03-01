(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewProspectsController: function(scope, routeParams , route, location, resourceFactory, http) {
			 // alert("hh");
	        scope.prospects = [];   
	        scope.prospectDetailData=[];
	        resourceFactory.prospectViewResource.getViewProspects({id: routeParams.id} , function(data) {
	        	//alert('discountController,' +data);
	            scope.prospects = data;                                                
	        });
	        resourceFactory.prospectHistoryResource.getHistoryProspects({prospectdetailid: routeParams.id} , function(data) {
	        	//alert('discountController,' +data);
	            scope.prospectDetailData = data.prospectDetailData;                                                
	        });
	        /*scope.deletemessage = function (){
	            resourceFactory.discountResource.delete({discountId: routeParams.id} , {} , function(data) {
	                  location.path('/prospects');
	                  // added dummy request param because Content-Type header gets removed 
	                  // if the request does not contain any data (a requested body)        
	            });
	          };
	        */  
	        
	        scope.getVal = function(flag){
	        	if(flag === "Closed" || flag === "Canceled"){
	        		return false;
	        	}
	        	else{
	        		return true;
	        	}
	        };
	        
	        scope.convertProspect = function() {  
	        	
		            resourceFactory.prospectConvertResource.save({deleteProspectId: routeParams.id} , {} ,function(data){
		            	location.path('/viewclient/'+data.resourceId);
		          });
		        };
	    }
	  });
	  mifosX.ng.application.controller('ViewProspectsController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.ViewProspectsController]).run(function($log) {
	    $log.info("ViewProspectsController initialized");
	  });
	}(mifosX.controllers || {}));