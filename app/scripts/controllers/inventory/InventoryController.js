(function(module) {
  mifosX.controllers = _.extend(module, {
    InventoryController: function(scope,webStorage, routeParams, location, resourceFactory, paginatorService) {
        scope.items = [];
        scope.grn = [];
        scope.itemdetails = [];
        scope.mrn = [];
        scope.itemhistory = [];
        scope.supplier = [];
        scope.call={status:""}; 
        
        
        var callingTab = webStorage.get('callingTab',null);
        if(callingTab == null){
        	callingTab="";
        }else{
		  scope.displayTab=callingTab.someString;
		 
		  if( scope.displayTab == "items"){
			 
			  scope.itemsTab = true;
			  webStorage.remove('callingTab');
		  }
		  else if(scope.displayTab == "itemDetails"){
			 
			  scope.itemDetailsTab =  true;
			  webStorage.remove('callingTab');
		  }
		  else if(scope.displayTab == "supplier"){
			  scope.supplierTab =  true;
			  webStorage.remove('callingTab');
		  }
		  else if(scope.displayTab == "grn"){
			  scope.grnTab = true;
			  webStorage.remove('callingTab');
		  }
		  else if(scope.displayTab == "mrn"){
			  scope.mrnTab =  true;
			  webStorage.remove('callingTab');
		  }else
		  {
			  webStorage.remove('callingTab');
		  };
		 
        }
        
        
        scope.itemFetchFunction = function(offset, limit, callback) {
			resourceFactory.itemResource.getAllItems({offset: offset, limit: limit} , callback);
		};
		
        
        scope.itemDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit} , callback);
		};
               
		scope.mrnDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.viewMrnResource.getAlldetails({offset: offset, limit: limit} , callback);
		};
		
		scope.itemHistoryFetchFunction = function(offset, limit, callback) {
			resourceFactory.itemhistoryResource.getAlldetails({offset: offset, limit: limit} , callback);
		};
        
		scope.supplierFetchFunction = function(offset, limit, callback) {
			resourceFactory.supplierResource.getAlldetails({offset: offset, limit: limit} , callback);
		};
        
		//scope.items = paginatorService.paginate(scope.itemFetchFunction, 14);

        scope.grnDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.grnResource.getAlldetails({offset: offset, limit: limit} , callback);
		};
		
		scope.getItems = function(){
			scope.items = paginatorService.paginate(scope.itemFetchFunction, 14);
		};
		
        scope.getGRNdetails = function () {
        	scope.grn = paginatorService.paginate(scope.grnDetailsFetchFunction, 14);
        };
        
        
        scope.getItemdetails = function () {
        	scope.itemdetails = paginatorService.paginate(scope.itemDetailsFetchFunction, 14);
        };
                
        scope.getMRNdetails = function () {
        	scope.mrn = paginatorService.paginate(scope.mrnDetailsFetchFunction, 14);
        };
        
        scope.getitemhistorydetails = function () {
            scope.itemhistory = paginatorService.paginate(scope.itemHistoryFetchFunction, 14);
        };
        
        scope.getsupplierdetails = function () {
                scope.supplier = paginatorService.paginate(scope.supplierFetchFunction, 14);          
        };

       
        
        
        
        scope.whatClassIsIt = function(someValue){
             if(someValue>0)
                 scope.call={status:"Yes"};
            else
                 scope.call={status:"No"};
        };
        
        
        scope.searchItems123 = function(offset, limit, callback) {
	    	  resourceFactory.itemResource.getAllItems({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchItems = function(filterText) {
	  			scope.items = paginatorService.paginate(scope.searchItems123, 14);
	  		};
      
      scope.searchItemDetails123 = function(offset, limit, callback) {
	    	  resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchItemDetails = function(filterText) {
	  			scope.itemdetails = paginatorService.paginate(scope.searchItemDetails123, 14);
	  		};
	  		
	  	scope.searchGRN123 = function(offset, limit, callback) {
		    	  resourceFactory.grnResource.getAlldetails({offset: offset, limit: limit , 
		    		  sqlSearch: scope.filterText } , callback); 
		          };
		  		
		  		scope.searchGRN = function(filterText) {
		  			scope.grn = paginatorService.paginate(scope.searchGRN123, 14);
		  		};
      
		scope.searchMRN123 = function(offset, limit, callback) {
			    	  resourceFactory.viewMrnResource.getAlldetails({offset: offset, limit: limit , 
			    		  sqlSearch:  scope.filterText } , callback); 
			          };
			  		
			  		scope.searchMRN = function(filterText) {
			  			scope.mrn = paginatorService.paginate(scope.searchMRN123, 14);
			  		};
			  		
	    scope.searchSupplier123 = function(offset, limit, callback) {
				    	  resourceFactory.supplierResource.getAlldetails({offset: offset, limit: limit , 
				    		  sqlSearch:  scope.filterText } , callback); 
				          };
				  		
				  		scope.searchSupplier = function(filterText) {
				  			scope.supplier = paginatorService.paginate(scope.searchSupplier123, 14);
				  		};
				  		
		scope.searchHistory123 = function(offset, limit, callback) {
					    	  resourceFactory.itemhistoryResource.getAlldetails({offset: offset, limit: limit , 
					    		  sqlSearch:  scope.filterText } , callback); 
					          };
					  		
					  		scope.searchHistory = function(filterText) {
					  			scope.itemhistory = paginatorService.paginate(scope.searchHistory123, 14);
					  		};		
        
        
       
    }
  });
  mifosX.ng.application.controller('InventoryController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','PaginatorService', mifosX.controllers.InventoryController]).run(function($log) {
    $log.info("InventoryController initialized");
  });
}(mifosX.controllers || {}));


/*(function(module) {
  mifosX.controllers = _.extend(module, {
    InventoryController: function(scope, routeParams, location, resourceFactory, paginatorService) {
        scope.items = [];
        scope.grn = [];
        scope.itemdetails = [];
        scope.mrn = [];
        scope.itemhistory = [];
        scope.supplier = [];
        scope.call={status:""}; 
        
       
        resourceFactory.itemResource.getAllItems(function(data) {
            scope.items= data;
         
        });


       
        scope.getGRNdetails = function () {
          resourceFactory.grnResource.getAlldetails(function(data) {
              scope.grn= data;
          });
        };
        
        
        scope.getMRNdetails = function () {
            resourceFactory.mrnResource.getAlldetails(function(data) {
                scope.mrn= data;
                
            });
        };
        scope.getitemhistorydetails = function () {
            resourceFactory.itemhistoryResource.getAlldetails(function(data) {
                scope.itemhistory= data;
                
            });
        };
        scope.getsupplierdetails = function () {
            resourceFactory.supplierResource.getAllDetails(function(data) {
                scope.supplier= data;
                
            });
        };

        
        scope.itemDetailsFetchFunction = function(offset, limit, callback) {
			resourceFactory.itemDetailsResource.getAlldetails({offset: offset, limit: limit} , callback);
		};
            
        
        scope.getItemdetails = function () {
        	scope.itemdetails = paginatorService.paginate(scope.itemDetailsFetchFunction, 3);
        };
                
        

       
        
        
        
        scope.whatClassIsIt = function(someValue){
             if(someValue>0)
                 scope.call={status:"Yes"};
            else
                 scope.call={status:"No"};
        };
        
        
       
    }
  });
  mifosX.ng.application.controller('InventoryController', ['$scope', '$routeParams', '$location', 'ResourceFactory','PaginatorService', mifosX.controllers.InventoryController]).run(function($log) {
    $log.info("InventoryController initialized");
  });
}(mifosX.controllers || {}));


(function(module) {
  mifosX.controllers = _.extend(module, {
    InventoryController: function(scope, routeParams , route, location, resourceFactory, http) {
        scope.items = [];
        scope.grn = [];
        scope.itemdetails = [];
        scope.mrn = [];
        scope.itemhistory = [];
        scope.supplier = [];
        scope.call={status:""}; 

        resourceFactory.itemResource.getAllItems(function(data) {
            scope.items= data;
         
        });


       
        scope.getGRNdetails = function () {
          resourceFactory.grnResource.getAlldetails(function(data) {
              scope.grn= data;
          });
        };
        
        scope.getItemdetails = function () {
            resourceFactory.itemDetailsResource.getAlldetails(function(data) {
                scope.itemdetails= data;
                
            });
        };
        
        
        
        scope.getMRNdetails = function () {
            resourceFactory.mrnResource.getAlldetails(function(data) {
                scope.mrn= data;
                
            });
        };
        scope.getitemhistorydetails = function () {
            resourceFactory.itemhistoryResource.getAlldetails(function(data) {
                scope.itemhistory= data;
                
            });
        };
        scope.getsupplierdetails = function () {
            resourceFactory.supplierResource.getAllDetails(function(data) {
                scope.supplier= data;
                
            });
        };

       
        
        
        
        scope.whatClassIsIt = function(someValue){
             if(someValue>0)
                 scope.call={status:"Yes"};
            else
                 scope.call={status:"No"};
        };
       
    }
  });
  mifosX.ng.application.controller('InventoryController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.InventoryController]).run(function($log) {
    $log.info("InventoryController initialized");
  });
}(mifosX.controllers || {}));
*/