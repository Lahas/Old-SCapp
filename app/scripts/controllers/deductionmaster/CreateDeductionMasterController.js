(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateDeductionMasterController: function(scope, resourceFactory, location,webStorage) {
		 
			  scope.categoryDatas = [];
			  scope.customerTypeDatas = [];
			  scope.deductionTypeDatas = [];
			  scope.businessDatas = [];
			  scope.stateData =[];
			  
			  scope.formData = {};
			 
			 /* scope.months=[{id:1,mon:"January"},{id:2,mon:"February"},{id:3,mon:"March"},{id:4,mon:"April"},
		            		  {id:5,mon:"May"},{id:6,mon:"June"},{id:7,mon:"July"},{id:8,mon:"August"},{id:9,mon:"September"},
		            		  {id:10,mon:"October"},{id:11,mon:"November"},{id:12,mon:"December"}];
*/			 /* scope.circles=[{id:1,circle:"ANDHRA PRADESH"},{id:2,circle:"DELHI"},{id:3,circle:"KARNATAKA"},{id:4,circle:"MAHARASHTRA"},
		            		  {id:5,circle:"MADHYA PRADESH"},{id:6,circle:"REST OF INDIA"}];      */		  
			
		        resourceFactory.mastersTemplateResource.getTemplate(function(data) {
		        
		            scope.categoryDatas = data.levelApplicables;
		            scope.customerTypeDatas = data.customerTypes;
		            scope.deductionTypeDatas = data.deductionTypeData;
		            scope.businessDatas =data.businessCategory;
		            scope.stateData = data.stateDatas;
		           //scope.partnerName=data.mediaSettlementPartnerName.partnerName;
		          
		        });
		        
		        /*scope.getCategory=function(pName){
					  console.log(pName);
					  resourceFactory.getCategoryAndPartner.get({partnerName: pName},function(data) {
				  			scope.formData.mediaCategory = data.mediaCategoryData.mediaCategoryId;
				  			scope.formData.partnerType = data.partnerTypeData.partnerTypeId;
				  			
				      });
				  };*/
		        
		        
				  
		         scope.cancel = function(){
			        	
					  webStorage.add("currentTab", {tab: "master" });
			      };
		  
		        scope.submit = function () {
		        	  resourceFactory.mastersResource.save(scope.formData,function(data){
		        		  location.path('/game');
		        	  });
		            webStorage.add("currentTab", {tab: "master" });
		          };
		        
		  
		  }
	  });
	  mifosX.ng.application.controller('CreateDeductionMasterController', ['$scope', 'ResourceFactory', '$location','webStorage', mifosX.controllers.CreateDeductionMasterController]).run(function($log) {
	    $log.info("CreateDeductionMasterController initialized");
	  });
	}(mifosX.controllers || {}));