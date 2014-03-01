(function(module) {
  mifosX.controllers = _.extend(module, {
	  EventOrderController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter) {

        scope.formData = {};
        scope.clientId = routeParams.id;
        scope.priceFormData = {};
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
        //scope.datass = {};
        scope.start={};
        scope.start.date = new Date();
        resourceFactory.eventOrderTemplateResource.get({clientId : routeParams.id},function(data){
        	scope.devices = data.devices;
        	scope.events = data.events;
        	scope.optTypes = data.optType;
        	scope.codes = data.codes;
        	scope.clientTypes = data.clientType;
        	scope.vodTab = true;
        	scope.gamesTab = false;
        	
        });

        
       /* scope.getEventPrice = function(){
        	resourceFactory.eventOrderPriceTemplateResource.getEventPrice({clientId : routeParams.id,ftype: scope.formData.source,otype: scope.formData.contentProvider,eventId: scope.formData.eventId},function(data){
        		scope.formData.updatedPrice = data.eventPrice;
        		scope.showPrice = true;
        	},function(errorData){
        		scope.showPrice = false;
        	});
        };
        */
        
        scope.getEventPrice = function(){
        	resourceFactory.eventOrderPriceTemplateResource.getEventPrice({clientId : routeParams.id,eventId: scope.formData.eventId},function(data){
        		scope.formData.updatedPrice = data.eventPrice;
        		scope.showPrice = true;
        	},function(errorData){
        		scope.showPrice = false;
        	});
        };
        
        scope.getGamesData = function(){
        	scope.vodTab = false;
        	scope.gamesTab = true;
        	resourceFactory.eventOrderGameTemplateResource.get({clientId : routeParams.id},function(data){
            	scope.events = data.events;
            	scope.partners = data.accountPartner;
            	scope.sources = data.source;
            });
        	
        };
        
        scope.changeOptType = function(source){
        	if(source.toString() === "None"){
        		/*scope.hidePartner = true;*/
        		this.formData.contentProvider = source.toString();
        	}
        	
        };
        
        scope.submitGameData = function(){

            this.formData.locale = "en";
            
            this.formData.formatType = this.formData.source;
            this.formData.optType = this.formData.contentProvider;
            delete this.formData.source;
            delete this.formData.contentProvider;
            this.formData.dateFormat = "dd MMMM yyyy";
        	var adjustmentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
            this.formData.eventBookedDate = adjustmentDate;
            resourceFactory.eventOrderTemplateResource.save(this.formData, function(data){
              location.path('/viewclient/'+routeParams.id);
            });
          
        };
       /* scope.updatePrice = function(){
        	var fD = {};
        	fD.clientId = routeParams.id;
        	fD.price = scope.price;
        	fD.optType = scope.formData.optType;
        	fD.formatType = scope.formData.formatType;
        	fD.eventId = scope.formData.eventId
        	resourceFactory.eventOrderPriceUpdateTemplateResource.update(fD,function(data){
            	scope.price = data.resourceIdentifier;
            });
        };*/
        
        scope.submit = function() {
          this.formData.locale = "en";
          delete this.formData.source;
          delete this.formData.contentProvider;
          this.formData.updatedPrice=11;
          this.formData.dateFormat = "dd MMMM yyyy";
      	  var adjustmentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
          this.formData.eventBookedDate = adjustmentDate;
          resourceFactory.eventOrderTemplateResource.save(this.formData, function(data){
            location.path('/viewclient/'+routeParams.id);
          });
        };

    }
  });
  mifosX.ng.application.controller('EventOrderController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter', mifosX.controllers.EventOrderController]).run(function($log) {
    $log.info("EventOrderController initialized");
  });
}(mifosX.controllers || {}));
