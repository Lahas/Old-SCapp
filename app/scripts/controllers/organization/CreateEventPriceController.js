(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateEventPriceController : function(scope, routeParams, resourceFactory, location) {
		
			scope.optTypes=[];
			scope.clientTypes=[]; 
			scope.format=[];
			scope.discountdata=[];
			scope.formData={};
			scope.hideForGame = true;
			resourceFactory.eventPriceTemplateResource.getpriceDetails({eventId: routeParams.id} ,function(data) {
				
				scope.catId = data.categoryId;
				scope.formData=data;
				/*if(scope.catId == '999991'){
					scope.hideForGame = false;
					scope.formData.formatType='SD';
				}*/
				scope.OptTypes = data.optTypes;				
				scope.Format = data.format;				
				scope.Discountdatas = data.discountdata;				
				scope.ClientTypes = data.clientTypes;
				
				
			});
			
			
			scope.getGamePriceData = function(){
				resourceFactory.eventPriceGameTemplateResource.getpriceDetails({eventId: routeParams.id} ,function(data) {
					
					scope.catId = data.categoryId;
					scope.formData=data;
					scope.contentProviders = data.contentProvider;				
					scope.decks = data.deck;				
					scope.Discountdatas = data.discountdata;				
					scope.ClientTypes = data.clientTypes;
					
					
				});
			};
			
			scope.submitGamePrice = function(){
				delete this.formData.optTypes;
				delete this.formData.discountdata;
				delete this.formData.format;
				delete this.formData.clientTypes;
				delete this.formData.categoryId;
				scope.formData.formatType = 'SD';
				scope.formData.optType = 'OWN';
				this.formData.locale = 'en';
				resourceFactory.eventpriceResource.save({'eventId': routeParams.id}, this.formData,
						function(data) {
							location.path('/viewEventPrice/'+ data.resourceId);
						});
			};
			
			scope.submit = function() {
				delete this.formData.optTypes;
				delete this.formData.discountdata;
				delete this.formData.format;
				delete this.formData.clientTypes;
				delete this.formData.categoryId;
				 this.formData.locale = 'en';
				resourceFactory.eventpriceResource.save({'eventId': routeParams.id}, this.formData,
						function(data) {
							location.path('/viewEventPrice/'+ data.resourceId);
						});
			};
		}
	});
	mifosX.ng.application.controller('CreateEventPriceController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.CreateEventPriceController]).run(function($log) {
	    $log.info("CreateEventPriceController initialized");
	  });
}(mifosX.controllers || {}));
