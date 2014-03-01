(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateGameMediaController: function(scope, resourceFactory, location,dateFilter,webStorage) {
		  
		  
		scope.partnerAgreements = [];
		scope.partnerTypeDatas = [];
		scope.mediaCategoryDatas = [];
		scope.partnerNames = [];
		scope.distributionDatas=[];
		scope.disableSubmit = false;
		scope.settlementSequenceDatas=[];
		
		
		var callingTab = webStorage.get('currentTab',null);
	        if(callingTab == null){
	        	callingTab="";
	        }else{
			  scope.displayTab=callingTab.tab;
			 
			  if( scope.displayTab == "partner"){
						
				  scope.partner = true;
				  webStorage.remove('currentTab');
			  }
			  else if(scope.displayTab == "agreement"){
				  scope.agreement123 =  true;
				  webStorage.remove('currentTab');
			  }
			  else if(scope.displayTab == "game"){
				  scope.game =  true;
				  webStorage.remove('currentTab');
			  }else if(scope.displayTab == "master"){
				  scope.master =  true;
				  webStorage.remove('currentTab');
				 
			  }
			  else
			  {
				  webStorage.remove('currentTab');
			  };
			 
	        } 
		  
	        
	        scope.months=[{id:1,mon:"January"},{id:2,mon:"February"},{id:3,mon:"March"},{id:4,mon:"April"},
	            		  {id:5,mon:"May"},{id:6,mon:"June"},{id:7,mon:"July"},{id:8,mon:"August"},{id:9,mon:"September"},
	            		  {id:10,mon:"October"},{id:11,mon:"November"},{id:12,mon:"December"}];
	            		  
	            		 
	        
	        scope.refresh=function(){
				 resourceFactory.getRefreshProcedure.get(function(data) {
			    });
			 };
	            	        scope.getPartnerTypeCategory=function(value){
	            	        	scope.partnerType=value;
	            	        	if(scope.partnerType == "" || scope.partnerType==null ){
	            					 
	            				 }else if(scope.mediaCategory == "" || scope.mediaCategory==null ){
	            					 
	            				 }else if(scope.monthId != null && scope.partnerName != null && scope.mediaCategory != null){
	            					 resourceFactory.getDisbursementsData.get({month:scope.monthId, partnerName: scope.partnerName,partnertypeId: scope.partnerType },function(data) {
	            						  scope.distributionDatas=data.distributionData;
	            				      });
	            					 
	            				 }else{
	            					 
	            				  resourceFactory.getPartnerName.get({partnertype: scope.partnerType,mediaCategory: scope.mediaCategory },function(data) {
	            					  scope.partnerNames=data;
	            			      });
	            				 }
	            	        	
	            	        };
	            	              
	            	        scope.getMediaCategory=function(value){
	            	        	scope.mediaCategory=value;
	            				 if(scope.partnerType == "" || scope.partnerType==null ){
	            					 
	            				 }else if(scope.mediaCategory == "" || scope.mediaCategory==null ){
	            					 
	            				 }else{
	            					 
	            				  resourceFactory.getPartnerName.get({partnertype: scope.partnerType,mediaCategory: scope.mediaCategory },function(data) {
	            					  scope.partnerNames=data;
	            			      });
	            				 }
	            			  };
	            			  scope.getpartnerName=function(value){
	            					scope.partnerName=value;
	            					
	            					if(scope.partnerType == "" || scope.partnerType==null ){
	            						 
	            					 }else if( scope.partnerName=="" || scope.partnerName==null ){
	            						 
	            					 }else if( scope.monthId=="" || scope.monthId==null ){
	            						 
	            					 }else{
	            						 
	            					  resourceFactory.getDisbursementsData.get({month:scope.monthId, partnerName: scope.partnerName,partnertypeId: scope.partnerType },function(data) {
	            						  scope.distributionDatas=data.distributionData;
	            				      });
	            					 }
	            				}  
	            			scope.getTableData=function(value){
	            				scope.monthId=value;
	            				
	            				if(scope.partnerType == "" || scope.partnerType==null ){
	            					 
	            				 }else if( scope.partnerName==null ){
	            					 
	            				 }else{
	            					 
	            				  resourceFactory.getDisbursementsData.get({month:scope.monthId, partnerName: scope.partnerName,partnertypeId: scope.partnerType },function(data) {
	            					  scope.distributionDatas=data.distributionData;
	            			      });
	            				 }
	            				
	            				
	            			};  
	            			  
	            			
	            	        scope.setDisbursementsScreen =function(){
	            	        	resourceFactory.mediaSettlementTemplateResource.get({},function(data){
	            	        		  scope.partnerTypeDatas = data.partnerTypeData;
	            			            scope.mediaCategoryDatas = data.mediaCategoryData;	
	            	        	});
	            	        };
	        
	        
		  scope.getPartnerAccount = function(){
			  resourceFactory.mediaSettlement.get(function(data) {
				  scope.partnerAccountData = data.partnerAccountDatas;
				  /*console.log(JSON.stringify(data));*/
				  /*scope.formData = data;
				  scope.partnerType = data.partnerTypeData;
				  scope.mediaCategory = data.mediaCategoryData;*/
				  
			  }); 
		  };
		  
		  
		  
		  scope.getPartnerAgreementScreen = function(){
			  resourceFactory.partnerAgreementResource.getAllfiles(function(data) {
				  scope.partnerAgreements= data.partnerAgreementDatas;
				  scope.fileName=data.partnerAgreementDatas.fileName;
					 
				  if(scope.fileName == null){
					  scope.fileName= false;
			  		}
		        	else{
		        		scope.fileName= true;
		        	}
	         });};
		 
		  
		  scope.setGameScreen = function(){
			  resourceFactory.partnerGameDetails.get(function(data){
				  scope.gameDetails = data;
			  });
		  };

		  scope.setRevenueSettlementScreen = function(){
			  resourceFactory.revenueSettlement.get(function(data){
				  scope.mediaCategoryDatas = data.mediaCategoryData;
			  });
		  };
		  
		  scope.unlockIt=function(value){
			  
			  $("."+value).removeAttr("disabled");
			  
			  };
			  
		  scope.lockIt=function(value){
			  $("."+value).attr("disabled","disabled");
			  };
			  scope.emptyDataActivate;
		  scope.getSettlementSeqRule = function(category){
			  resourceFactory.revenueSettlement.get({categoryId: category},function(data){
				 
				  scope.settlementSequenceDatas = data.settlementSequenceData;
				  scope.formData.partnerType1=data.defaultDataValues.partnerType1;
				  scope.formData.partnerType2=data.defaultDataValues.partnerType2;
				  scope.formData.partnerType3=data.defaultDataValues.partnerType3;
				  scope.formData.defaultData =data.defaultDataValues.defaultData; 
				  scope.emptyDataActivate=data.defaultDataValues.defaultData;
				  scope.partnerTypeDatas = data.partnerTypeData;
				  scope.formData.partnerAccountId=data.settlementSequenceData.partnerAccountId;
				  
				  if(scope.formData.defaultData == 0){
		 				 scope.defaultDataName="Default";
				  }
				 
				  
				 for (var i in scope.settlementSequenceDatas){
				  		if(	scope.settlementSequenceDatas[i].partnerType4 == 0){
				  			scope.settlementSequenceDatas[i].partnerType4=null;
				  		}
				  		if(scope.settlementSequenceDatas[i].partnerType5 == 0 ){
				  			scope.settlementSequenceDatas[i].partnerType5=null;
				  		}
				  		if(scope.settlementSequenceDatas[i].partnerType6 == 0){
				  			scope.settlementSequenceDatas[i].partnerType6=null;
				  		};
				  	};
				  
				  
			  });
		  };
		  
		  
		 
 		  scope.submitRevenueSettlement = function(){
 			 
 			for (var i in scope.settlementSequenceDatas){
		  		if(scope.settlementSequenceDatas[i].partnerType4 == null || scope.settlementSequenceDatas[i].partnerType5 == null || scope.settlementSequenceDatas[i].partnerType6 == null ||
		  				scope.settlementSequenceDatas[i].partnerType4 == 0 || scope.settlementSequenceDatas[i].partnerType5 == 0 || scope.settlementSequenceDatas[i].partnerType6 == 0){
		  			scope.value4null=scope.settlementSequenceDatas[i].partnerAccountId;
		  			scope.unlockIt(scope.value4null);
		  		}
		  	} 	 
			  scope.formData.settlementSequenceData = new Array();
			  if(scope.settlementSequenceDatas.length>0){
	        		for(var i in scope.settlementSequenceDatas){
	        			//console.log("i: "+i);
	        			scope.formData.settlementSequenceData.push({
	        				partnerAccountId : scope.settlementSequenceDatas[i].partnerAccountId,
	        				partnerType4 : scope.settlementSequenceDatas[i].partnerType4,
	        				partnerType5 : scope.settlementSequenceDatas[i].partnerType5,
	        				partnerType6 : scope.settlementSequenceDatas[i].partnerType6,
							locale : "en",
	        			});
	        		}
	        	}
//			  console.log(JSON.stringify(scope.formData));
			  resourceFactory.editsettlementSequenceDataDetails.update(scope.formData,function(data){
			  });
		  };
		  
		/*  scope.getSettlementSeqRule = function(category){
			  resourceFactory.revenueSettlement.get({categoryId: category},function(data){
				  scope.settlementSequenceDatas = data.settlementSequenceData;
				  scope.agreementCategoryDatas = data.agreementCategoryData;
				  scope.playSourceDatas = data.playSourceData;
				  scope.settlementSourceDatas = data.settlementSourceData;
				  scope.royaltyTypeDatas = data.royaltyTypeData;
				  
			  });
		  };*/
		  
		  scope.getMasterScreen = function(){
			  resourceFactory.mastersResource.getAllmaster(function(data) {
				  scope.masterData = data.masterDatas;
				 
				  
			  }); 
		  };
		  
		  
		  
		  
		  /*scope.submitRevenueSettlement = function(){
			  
			  scope.formData1 = scope.settlementSequenceDatas;
			  for(i in scope.formData1){
				  console.log("sending..: "+scope.formData1[i]);
				  scope.formData1[i].locale="en";
				  resourceFactory.submitSettlement.save(scope.formData1[i],function(data){
					  console.log("Data Saved: "+JSON.stringify(data));
					  scope.partner = true;
		          });
			  }
			  
		  };*/
	       
		  scope.submitPartnerAccount = function(){
			  scope.disableSubmit = true;
			  console.log(JSON.stringify(scope.formData));
			  console.log("this is submit function ..!");
			  delete scope.formData.partnerTypeData;
			  delete scope.formData.mediaCategoryData;
			  
			  resourceFactory.mediaSettlement.save(scope.formData,function(data){
	            	/*location.path('/viewprospects/'+data.commandId);*/
				  console.log("Data Saved: "+JSON.stringify(data));
				  scope.disableSubmit = false;
	          },function(errorData){
	        	  scope.disableSubmit = false;
	          });
			  
		  };
		  
		  
		 
     
      	 scope.routeTo = function(id){
              location.path('/editPartnerAgreement/'+ id);
               
         };
      	
          scope.downloadFile = function (id){ 
        	  window.open('https://localhost:9554/obsplatform/api/v1/mediasettlements/'+id+'/print?tenantIdentifier=default');
      	  };
	  }
  });
  mifosX.ng.application.controller('CreateGameMediaController', ['$scope', 'ResourceFactory', '$location','dateFilter','webStorage', mifosX.controllers.CreateGameMediaController]).run(function($log) {
    $log.info("CreateGameMediaController initialized");
  });
}(mifosX.controllers || {}));
