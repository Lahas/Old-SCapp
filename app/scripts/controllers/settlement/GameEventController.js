(function(module) {
  mifosX.controllers = _.extend(module, {
	  GameEventController: function(scope, resourceFactory,webStorage,routeParams,location) {
		  
		  scope.formData = {};
		  
		  scope.clientId = routeParams.id;
		  /*scope.months=[{id:1,mon:"January"},{id:2,mon:"February"},{id:3,mon:"March"},{id:4,mon:"April"},
	            		  {id:5,mon:"May"},{id:6,mon:"June"},{id:7,mon:"July"},{id:8,mon:"August"},{id:9,mon:"September"},
	            		  {id:10,mon:"October"},{id:11,mon:"November"},{id:12,mon:"December"}];*/
		  
		  var clientData = webStorage.get('clientData');
	        scope.displayName=clientData.displayName;
	        scope.statusActive=clientData.statusActive;
	        scope.accountNo=clientData.accountNo;
	        scope.officeName=clientData.officeName;
	        scope.balanceAmount=clientData.balanceAmount;
	        scope.currency=clientData.currency;
	        scope.imagePresent=clientData.imagePresent;
	        scope.formData.categoryType = clientData.categoryType;
	        scope.formData.cId = clientData.clientId;
	        scope.gameEventData = [];
	        
	        scope.routeTo = function(id){
	        	location.path('/viewinteractivedetails/'+id);
	        };
	        
	        resourceFactory.createGameEventResource.get({cId:routeParams.id},function(data) {
	            scope.formData = data;
	            
	            
	        });
	    }
  });
  mifosX.ng.application.controller('GameEventController', ['$scope', 'ResourceFactory','webStorage','$routeParams','$location', mifosX.controllers.GameEventController]).run(function($log) {
    $log.info("GameEventController initialized");
  });
}(mifosX.controllers || {}));