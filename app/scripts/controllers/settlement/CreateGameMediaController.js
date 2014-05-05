(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateGameMediaController: function(scope, resourceFactory, location,dateFilter,webStorage,PaginatorService,$notification,dateFilter) {
		  
		  
		scope.partnerAgreements = [];
		scope.partnerTypeDatas = [];
		scope.mediaCategoryDatas = [];
		scope.partnerNames = [];
		scope.distributionDatas=[];
		scope.disableSubmit = false;
		scope.settlementSequenceDatas=[];
		scope.clientNames=[];
		scope.formData={};
		scope.formData.invoiceTo;
		scope.formData.deliverTo;
		scope.activity = {};
		scope.purchaseOrderDate = {};
		scope.partnerAddressDetail = {};
		scope.partnerAddressDetail.purchaseOrderNumber = "IGL/PROVPO/Business/Month/Sequence";
		scope.purchaseOrderDate.date= new Date();
		scope.activity.date = new Date();
		

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
				 
			  }else if(scope.displayTab == "purchaseorder"){
				  scope.master =  true;
				  webStorage.remove('currentTab');
				 
			  }
			  else
			  {
				  webStorage.remove('currentTab');
			  };
			 
	        } 
		  
	        
	       scope.months=[{id:1,mon:"Jan"},{id:2,mon:"Feb"},{id:3,mon:"Mar"},{id:4,mon:"Apr"},
	            		  {id:5,mon:"May"},{id:6,mon:"Jun"},{id:7,mon:"Jul"},{id:8,mon:"Aug"},{id:9,mon:"Sep"},
	            		  {id:10,mon:"Oct"},{id:11,mon:"Nov"},{id:12,mon:"Dec"}];
	            		  
	            		 
	       /*scope.generatePurchaseOrder = function(){
	    	   scope.ac = scope.formData.activityMonth.toString().substring(0,3)+" "+(new Date().getFullYear());//.toString().substring(2,5);
	    	   console.log(scope.ac);
	       }; */
	       
	       /*scope.getPartnerAddressDetails = function(){
	    	   resourceFactory.getPartnerAddressDetails.get({partnerId:scope.formData.partnerAddress},function(data){
	    		   scope.partnerAddressDetail.partnerAddressDetails = data;
	    		   scope.perticularsData = data.perticulars;
	    		   //console.log(data);
	    	   });
	       };*/
	       
	       
/*	       scope.getDeliverToDetails = function(){
	    	   
	    	   resourceFactory.getProPurchaseOrderAddressDetails.get({purchaseOrderId:scope.formData.deliverTo},function(data){
	    		   scope.deliverToData = data[0];
	    	   });
	       };*/
	       
	       /*scope.getInvoiceToDetails = function(){
	    	   
	    	   resourceFactory.getPurchaseOrderAddressDetails.get({purchaseOrderId:scope.formData.invoiceTo},function(data){
	    		   scope.invoiceToData = data[0];
	    	   });
	       };*/
	       
	       
	       scope.getRoyaltyAmount = function(){
	    	   resourceFactory.getRoyaltyAmountDetails.get({partnerAddress:scope.formData.partnerAddress,month:dateFilter(scope.month.date,"MMM yyyy"),perticulars:scope.formData.perticulars},function(data){
	    		   
	    		   scope.formData.royaltyAmount = data.royaltyAmount;
	    		   scope.royaltyAmountsData = data.royaltyAmountData;
	    		   scope.formData.currencyCode = data.currencyCode;
	    		   scope.formData.purchaseOrderNumber = data.nextPurchaseOrderTableId;
	    		   scope.formData.businessLine = data.businessLineData[0];
	    		   scope.formData.activityMonthInNumericData = getMonthInNumeric(data.activityMonthInNumericData[0].toString());
	    		   scope.partnerAddressDetail.purchaseOrderNumber = "IGL/PROVPO/"+scope.formData.businessLine+"/"+scope.formData.activityMonthInNumericData+"/"+scope.formData.purchaseOrderNumber+"";
	    		   scope.formData.purchaseOrderNumber = scope.partnerAddressDetail.purchaseOrderNumber;
	    		   
	    	   },function(errorData){
	    		   
	    		   scope.royaltyAmountsData = undefined;
	    		   scope.formData.currencyCode = undefined;
	    		   scope.formData.royaltyAmount = undefined;
	    		   scope.formData.purchaseOrderNumber = undefined;
	    		   scope.formData.businessLine = undefined;
	    		   scope.formData.activityMonthInNumericData = undefined;
	    		   scope.partnerAddressDetail.purchaseOrderNumber = "IGL/PROVPO/Business/Month/Sequence";
	    		   
	    	   });
	       };
	       
	       var getMonthInNumeric = function(acm){
	    	   var res = acm.split(" ");
	    	   for (var i in scope.months){
	    		   if(scope.months[i].mon == res[0]){
	    			   var monthStr = (scope.months[i].id>9?scope.months[i].id:0+""+scope.months[i].id).toString();
	    			   return monthStr+""+res[1].slice(-2);
	    		   }
	    	   }
	       };
	       
	      
	       /*scope.submitProPurchaseOrder = function(){
	    	   scope.formData.clientId = scope.royaltyAmountsData[0].clientId;
	    	   scope.formData.purchaseOrderDate = dateFilter(scope.purchaseOrderDate.date,"dd MMMM yyyy");
	    	   scope.formData.month = dateFilter(scope.month.date,"MMM yyyy");
	    	   scope.formData.locale = "en";
	    	   scope.formData.dateFormat = "dd MMMM yyyy";
	    	   resourceFactory.createProPurchaseOrder.save(scope.formData,function(data){
	    		   $notification.success("Successfully Saved","Purchase Order","User data");
	    		   scope.royaltyAmountsData = undefined;
	    		   scope.formData.currencyCode = undefined;
	    		   scope.formData.royaltyAmount = undefined;
	    		   scope.formData.purchaseOrderNumber = undefined;
	    		   scope.formData.businessLine = undefined;
	    		   scope.formData.activityMonthInNumericData = undefined;
	    		   scope.partnerAddressDetail.purchaseOrderNumber = "IGL/PROVPO/Business/Month/Sequence";
	    	   },function(errorData){
	    		   
	    	   });
	       };*/
	       
	      /* scope.getActivityMonths = function(){
	    	   resourceFactory.getActivityMonthDetails.get({perticularsId:scope.formData.perticulars},function(data){
	    		   scope.activityMonthData = data;
	    	   });
	       };*/
	       
	       /*scope.getProPurchaseOrderTemplate = function(){
	    	   resourceFactory.getProPurchaseOrderTemplate.get(function(data){
	    		   scope.addressData = data.purchaseOrderData;
	    		   scope.partnerData = data.partnerNames;
	    		   scope.currencyCodesData = data.currencyCodes;
	    	   });
	       };*/
	       
	       
	       
	        scope.refresh=function(){
	        	 scope.loading = true;
				 resourceFactory.getRefreshProcedure.get(function(data) {
					 scope.loading = false;
			     },function(errorData){
	        	     scope.loading = false;
				 });
			 };
	            	        scope.getPartnerTypeCategory=function(value){
	            	        	scope.partnerType=value;
	            	        	scope.formData.partnerName=null;
	            	        	if(scope.partnerType == "" || scope.partnerType==null ){
	            					 
	            				 }else if(scope.mediaCategory == "" || scope.mediaCategory==null ){
	            					 
	            				 }/*else if(scope.monthId != null && scope.partnerName != null && scope.mediaCategory != null){
	            					 resourceFactory.getDisbursementsData.get({month:scope.monthId, partnerName: scope.partnerName,partnertypeId: scope.partnerType },function(data) {
	            						  scope.distributionDatas=data.distributionData;
	            				      });
	            					 
	            				 }*/else{
	            					 
	            				  resourceFactory.getPartnerName.get({partnertype: scope.partnerType,mediaCategory: scope.mediaCategory,client:scope.ClientName },function(data) {
	            					  scope.partnerNames=data;
	            					  if(scope.partnerNames == null || scope.partnerNames == ""){
   	            						  $("#partnerN").attr("disabled","disabled"); 
   	            						scope.activityMonths=null;
   	            						$("#activityM").attr("disabled","disabled"); 
   	            					  }else{
   	            						$("#partnerN").removeAttr("disabled");
   	            					  }
	            			      });
	            				 }
	            	        	
	            	        };
	            	        
	            	        
	            	        scope.getClientNames=function(value){
	            	        	scope.ClientName=value;	            	        	
	            	        	scope.partnerNames=null;
	            	        	scope.activityMonths=null;
	            	        	scope.formData.mediaCategory=null;
	            	        	scope.distributionDatas=[];
	            	        	 $("#partnerN").attr("disabled","disabled"); 
	            	        	 $("#activityM").attr("disabled","disabled"); 
	            	        	 resourceFactory.getmediaCategoryData.get({client: scope.ClientName},function(data) {
	            					  scope.mediaCategoryDatass=data;
	            					  
	            			      });
	            	        	
	            			  };
	            	        
	            			  
	            			  scope.partnerTo=function(id){
	            				  location.path('/viewpartneraccount/'+id);
	            			  };
	            			  
	            			  
	            	        scope.getMediaCategory=function(value){
	            	        	scope.mediaCategory=value;
	            	        	scope.formData.partnerName=null;
	            				 if(scope.partnerType == "" || scope.partnerType==null ){
	            					 
	            				 }else if(scope.mediaCategory == "" || scope.mediaCategory==null ){
	            					 
	            				 }else{
	            					 
	            				  resourceFactory.getPartnerName.get({partnertype: scope.partnerType,mediaCategory: scope.mediaCategory,client:scope.ClientName },function(data) {
	            					  scope.partnerNames=data;
	            					  if(scope.partnerNames == null || scope.partnerNames == ""){
   	            						  $("#partnerN").attr("disabled","disabled"); 
   	            						scope.activityMonths=null;
   	            						$("#activityM").attr("disabled","disabled"); 
   	            					  }else{
   	            						$("#partnerN").removeAttr("disabled");
   	            					  }
	            			      });
	            				 }
	            			  };
	            			  scope.getpartnerName=function(value){
	            					scope.partnerName=value;
	            					scope.formData.activityDate=null;
	            					if(scope.partnerType == "" || scope.partnerType==null ){
	            						 
	            					 }else if( scope.partnerName=="" || scope.partnerName==null ){
	            						 
	            					 }else{
	            						 
	            						 resourceFactory.getActivityMonth.get({partnertype: scope.partnerType,partnerName: scope.partnerName,client:scope.ClientName },function(data) {
	   	            					  scope.activityMonths=data;
	   	            					  
	   	            					  if(scope.activityMonths == null || scope.activityMonths == ""){
	   	            						  $("#activityM").attr("disabled","disabled"); 
	   	            					  }else{
	   	            						$("#activityM").removeAttr("disabled");
	   	            					  }
	   	            			      });
	            					 }
	            				};  
	            			scope.getTableData=function(value){
	            				scope.monthId=value;
	            				
	            				
	            				if(scope.partnerType == "" || scope.partnerType==null ){
	            					 
	            				 }else if( scope.partnerName==null ){
	            					 
	            				 }else{
	            					 
	            				  resourceFactory.getDisbursementsData.get({month:scope.monthId, partnerName: scope.partnerName,partnertypeId: scope.partnerType,mediaCategory: scope.mediaCategory,client:scope.ClientName },function(data) {
	            					  scope.distributionDatas=data.distributionData;
	            			      });
	            				 }
	            				
	            				
	            			};  
	            			  
	            			
	            	        scope.setDisbursementsScreen =function(){
	            	        	resourceFactory.mediaSettlementTemplateResource.get({},function(data){
	            	        		  scope.partnerTypeDatas = data.partnerTypeData;
//	            			            scope.mediaCategoryDatas = data.mediaCategoryData;	
	            			            scope.clientNames = data.clients;
	            			            
	            	        	});
	            	        };
	        
	            	        
	            	        
	          scope.getPartnerAccountDataFetchFunction = function(offset, limit, callback) {
	            	  	resourceFactory.mediaSettlement.get({offset: offset, limit: limit} ,callback);
	           	};  
	            	  			
	          scope.getPartnerAccount = function(){
			         scope.partnerAccountData = PaginatorService.paginate(scope.getPartnerAccountDataFetchFunction, 14);
			         
		        };
		  
		     scope.searchPartnerHistory123 = function(offset, limit, callback) {
	    	          resourceFactory.mediaSettlement.get({offset: offset, limit: limit ,sqlSearch: scope.filterText} , callback);
	            };
	  		
		     scope.searchPartnerHistory = function(filterText) {
	  			  scope.partnerAccountData = PaginatorService.paginate(scope.searchPartnerHistory123, 14);
	  	    	}; 
		  
	  		 scope.getPartnerAgreementDataFetchFunction = function(offset, limit, callback){
	  			    resourceFactory.partnerAgreementResource.getAllfiles({offset: offset, limit: limit} , callback);
	  			/* scope.fileName=fileName;
	  			if(scope.fileName == null){
					  scope.fileName= false;
			  		}
		        	else{
		        		scope.fileName= true;
		        	}*/
	  		   };
	  		
		  
		    scope.getPartnerAgreementScreen = function(){
			        scope.partnerAgreements = PaginatorService.paginate(scope.getPartnerAgreementDataFetchFunction, 14);
			        /*
			        scope.fileName=scope.partnerAgreements.pageItems[i].partnerAgreementDatas.fileName;
		  			if(scope.fileName == null){
						  scope.fileName= false;
				  		}
			        	else{
			        		scope.fileName= true;
			        	}*/
			       // console.log(scope.partnerAgreements);
	           };
	         
	       scope.searchPartnerAgreementHistory123 = function(offset, limit, callback) {
		    	  resourceFactory.partnerAgreementResource.getAllfiles({offset: offset, limit: limit ,sqlSearch: scope.filterText} , callback); 
		       };

	   	    scope.searchPartnerAgreementHistory = function(filterText) {
	  			scope.partnerAgreements = PaginatorService.paginate(scope.searchPartnerAgreementHistory123, 14);
	  		   }; 
		 
		  
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
			  	  
				  console.log(scope.settlementSequenceDatas);
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
			  
			  console.log("submiting revenusettlement");
			  
//			  console.log(JSON.stringify(scope.formData));
			  resourceFactory.editsettlementSequenceDataDetails.update(scope.formData,function(data){
				  $notification.success("Royalty Sequence","Sequence saved","User data");
				  /*  
				  scope.alertMessage="Successfully Saved.. !! ";
				  scope.showSuccessAlert=true;
				  
				  window.setTimeout(function() {
					  scope.showSuccessAlert=false;
				  }, 2000);*/
				  
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
              location.path('/viewpartneragreement/'+ id);
               
         };
      	
          scope.downloadFile = function (id){ 
        	  window.open('https://'+document.location.host+'/obsplatform/api/v1/mediasettlements/'+id+'/print?tenantIdentifier=default');
      	  };
	  }
  });
  mifosX.ng.application.controller('CreateGameMediaController', ['$scope', 'ResourceFactory', '$location','dateFilter','webStorage','PaginatorService','$notification','dateFilter', mifosX.controllers.CreateGameMediaController]).run(function($log) {
    $log.info("CreateGameMediaController initialized");
  });
}(mifosX.controllers || {}));
