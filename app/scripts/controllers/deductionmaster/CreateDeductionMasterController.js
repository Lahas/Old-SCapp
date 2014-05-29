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
					  webStorage.add("callingTab", {tab: "master" });
			      };
		  
		        scope.submit = function () {
		        	  resourceFactory.mastersResource.save(scope.formData,function(data){
		        		  location.path('/clients');
		        	  });
		            webStorage.add("callingTab", {tab: "master" });
		          };
		    /*    scope.validation=function(value){
		        	
		        	//var x=value;
		        	scope.number=value.toString();
		        	var checkDigit=scope.number.charAt(scope.number.length-1);
		          	var sum=0;
		          	scope.char=[];
		          	for(var i=0; i< scope.number.length-1;i++){
		          		scope.number.charAt(i);
		          		scope.char.push(scope.number.charAt(i));
		          	}
		          	
		          	scope.revNumber=scope.char.reverse();
		          
		          for(var i=0;i<scope.revNumber.length;i++){
		        	  if(i%2==0){
		        		  scope.revNumber[i]=scope.revNumber[i]*2;
		        		  if( scope.revNumber[i] > 9){ 
		        			  scope.revNumber[i]=1+scope.revNumber[i]%10;
		        		  }else{}
		        	  }else if(i%2==1){
		        		  scope.revNumber[i]=scope.revNumber[i]; 
		        	  }
		        	  sum=sum+parseInt(scope.revNumber[i]);
		        	  
		          }
		          var module=sum%10;
		        
		          if(module==0){
		        	  console.log("valid no");
		          }else if(checkDigit==10-module){
		        	  console.log("valid no");
		          }else{
		        	  console.log("not valid no");
		          }
		        };
		  */
		  }
	  });
	  mifosX.ng.application.controller('CreateDeductionMasterController', ['$scope', 'ResourceFactory', '$location','webStorage', mifosX.controllers.CreateDeductionMasterController]).run(function($log) {
	    $log.info("CreateDeductionMasterController initialized");
	  });
	}(mifosX.controllers || {}));