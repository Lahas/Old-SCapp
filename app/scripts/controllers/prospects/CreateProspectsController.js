(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateProspectsController: function(scope, resourceFactory, location,dateFilter,validator) {
			
	        scope.sourceOfPublicityDatas = [];
	        scope.planDatas = [];
	        scope.countryDatas = [];
	        scope.stateDatas = [];
	        scope.cityDatas = [];
	        scope.first = {};
	        scope.first.date = new Date();
	        scope.first.time = "10:10";
	        
	        scope.minDate = new Date();
	        
	        $('#timepicker1').timepicker({
	        	showInputs:false,
	        	showMeridian:false
	        });
	        
	        
	        resourceFactory.prospectTemplateResource.getTemplate(function(data) {
	        	
	            scope.sourceOfPublicityDatas = data.sourceOfPublicityData;
	            scope.planDatas = data.planData;
	            scope.countryDatas = data.countryData;
		        scope.stateDatas = data.stateData;
		        scope.cityDatas = data.cityData;
	            scope.formData = {
	            		
	            };
	            $("#city").change(function(){
	            	
	            	resourceFactory.AddressTemplateResource.get({city : scope.formData.city}, function(data) {
	            		scope.formData.state = data.state;
	            		scope.formData.country = data.country;
	             
	            });
	            });
	            
	        });
	         
	        scope.submit = function() {
	        	
	        	var res1 = validator.validateEmail(scope.formData.email);
	        	var res2 = validator.regXForMobileNumber(scope.formData.homePhoneNumber);
	        	var res3 = validator.validateZipCode(scope.formData.zipCode);
	        	
	        	/*if(res1 == false || res2 ==false || res3 == false){
	        		console.log("res1: "+res1);
	        		console.log("res2: "+res2);
	        		console.log("res3: "+res3);
	        		return undefined;
	        	}*/
	        	
	        	 this.formData.locale = "en";
	        	 var reqDate = dateFilter(scope.first.date,'yyyy-MM-dd');
	        	 this.formData.preferredCallingTime = reqDate+" "+$('#timepicker1').val()+':00';
	        	 this.formData.cityDistrict=this.formData.city;
	        	 this.formData.city;
	            resourceFactory.prospectResource.save(this.formData,function(data){
	            	location.path('/viewprospects/'+data.commandId);
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateProspectsController', ['$scope', 'ResourceFactory', '$location','dateFilter','HTValidationService', mifosX.controllers.CreateProspectsController]).run(function($log) {
	    $log.info("CreateProspectsController initialized");
	  });
	}(mifosX.controllers || {}));

