(function(module) {
  mifosX.controllers = _.extend(module, {
    ClientController: function(scope, resourceFactory , paginatorService,$notification,webStorage,location) {
        
      scope.clients = [];
      
      
      var callingTab = webStorage.get('callingTab',null);
      if(callingTab == null){
      	callingTab="";
      }else{
    	  scope.displayTab=callingTab.tab;	
    	//console.log( scope.displayTab);
		  if( scope.displayTab == "client"){
			  
			  scope.client = true;
			  webStorage.remove('callingTab');
			  
		  }else if(scope.displayTab == "master"){
			  
			  scope.master =  true;
			  webStorage.remove('callingTab');
			  
		  }else
		  {
			  webStorage.remove('callingTab');
		  };
		 
      }
       
      var fetchFunction = function(offset, limit, callback) {
        resourceFactory.clientResource.getAllClients({offset: offset, limit: limit} , callback);
      };
      
      scope.getClients = function(){
      scope.clients = paginatorService.paginate(fetchFunction, 14);
      
      };
      
      scope.search123 = function(offset, limit, callback) {
          resourceFactory.clientResource.getAllClients({offset: offset, limit: limit , sqlSearch: scope.filterText } , callback); 
         };
       
       scope.search = function(filterText) {
        scope.clients = paginatorService.paginate(scope.search123, 14);
       };
       
       scope.routeTo=function(id){
    	   location.path('/viewclient/'+id);
       };
       
       scope.routeToMaster=function(id){
    	   location.path('/editdeductionmaster/'+id);  
       };
       
       scope.getMasterScreen = function(){
    	   
			  resourceFactory.mastersResource.getAllmaster(function(data) {
				  scope.masterData = data.masterDatas;
				  
			  }); 
		  };
    }
  });
  mifosX.ng.application.controller('ClientController', ['$scope', 'ResourceFactory', 'PaginatorService','$notification','webStorage','$location', mifosX.controllers.ClientController]).run(function($log) {
    $log.info("ClientController initialized");
  });
}(mifosX.controllers || {}));
