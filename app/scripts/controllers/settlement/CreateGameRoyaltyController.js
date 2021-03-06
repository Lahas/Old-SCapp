(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateGameRoyaltyController: function(scope, resourceFactory, location,dateFilter,webStorage,PaginatorService,$notification) {
		  
		  
		scope.partnerAgreements = [];
		scope.partnerTypeDatas = [];
		scope.mediaCategoryDatas = [];
		scope.partnerNames = [];
		scope.distributionDatas=[];
		scope.disableSubmit = false;
		scope.settlementSequenceDatas=[];
		scope.clientNames=[];
		scope.activityMonths=[];
		scope.distribution=[];
		scope.formData={};

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
	        
	        scope.refresh=function(fileId){
	        	 scope.loading = true;
				 resourceFactory.getRefreshProcedure.get({fileId: fileId},function(data) {
					 scope.loading = false;
			    });
			 };
			 
 	        
 	        scope.getClientNames=function(value,fileId){
 	        	scope.ClientName=value;
 	        	scope.fileId=fileId;
 	        	scope.partnerNames=null;
 	        	scope.activityMonths=null;
 	        	scope.totalRA="";
 	        	scope.distributionDatas=[];
 	        	scope.distribution=[];
 	        	scope.formData.totalRA=null;
 	        	scope.formData.activityDate=null;
 	        	scope.mediaCategory=null;
 	        	scope.patnerType=null;
 	        	scope.partnerNames = [];
 	        	scope.partnerName=null;
 	        	scope.formData.partnerName=null;
 	        	scope.formData.partnerType=null; 	        	 
 	        	 if(scope.ClientName == "All"){
 	        		 resourceFactory.getmediaCategoriesData.get({fileId:scope.fileId},function(data) {
     					  scope.mediaCategoryDatass=data;
     					  scope.mediaCategoryDatass.push({mediaCategory:"All",mediaCategoryId:01});
     					  scope.partnerNames.push({partnerName:"All"});
     					  scope.formData.partnerName=scope.partnerNames[0].partnerName; 
     	        	 }); 
 	        		 resourceFactory.getActivityMonthWithFileId.get({client: scope.ClientName,fileId:scope.fileId},function(data){
     	        		 scope.activityMonths=data;
     	        		 if(scope.activityMonths.length>0){
     	        			$("#activityM").removeAttr("disabled");
     	        		 }else{
     	        			$("#activityM").attr("disabled","disabled"); 
     	        		 }
     	        	 });
 	        	 }else{
 	        	 resourceFactory.getmediaCategoryData.get({client: scope.ClientName,fileId:scope.fileId},function(data) {
 					  scope.mediaCategoryDatass=data;
 					  if(scope.mediaCategoryDatass.length==0){
 						 scope.mediaCategoryDatass.push({mediaCategory:"All",mediaCategoryId:01});
 						 scope.formData.mediaCategory=scope.mediaCategoryDatass[0].mediaCategoryId; 						
 					  }else{
 						 scope.mediaCategoryDatass.push({mediaCategory:"All",mediaCategoryId:01}); 
 						 scope.formData.mediaCategory=scope.mediaCategoryDatass[1].mediaCategoryId;
 					  }
 					  scope.partnerNames.push({partnerName:"All"});
 					  scope.formData.partnerName=scope.partnerNames[0].partnerName;
 					  scope.formData.patnerType=scope.partnerTypeDatas[4].id;		  
 					
 	        	 });
 	        	 resourceFactory.getActivityMonthWithFileId.get({client: scope.ClientName,fileId:scope.fileId},function(data){
 	        		 scope.activityMonths=data;
 	        		 if(scope.activityMonths.length>0){
 	        			$("#activityM").removeAttr("disabled");
 	        		 }else{
 	        			$("#activityM").attr("disabled","disabled"); 
 	        		 }
 	        	 });
 					  
 	        	}
 			  };
 	        
 	        scope.getMediaCategory=function(value){
 	        	scope.mediaCategory=value;
 	        	scope.formData.partnerName=null;
 	        	scope.formData.activityDate=null;
 	        	$("#activityM").attr("disabled","disabled");
 	        	scope.distributionDatas=[];
 	            scope.distribution=[];
 	        	scope.totalRA="";
 	        	scope.formData.totalRA=null;
 	        	if(scope.mediaCategory!=null&&(scope.partnerType==1||scope.partnerType==undefined)){
 	        		scope.formData.partnerName="All";
     	        	 resourceFactory.getActivityMonthWithFileId.get({client: scope.ClientName,fileId:scope.fileId},function(data){
     	        		 scope.activityMonths=data;
     	        		$("#activityM").removeAttr("disabled");
     	        	 });
     				
 	        	}else{
 					 if(scope.mediaCategory==null){
 						 scope.mediaCategory=1;
 						 }else{}
 				  resourceFactory.getPartnerName.get({partnertype: scope.partnerType,mediaCategory: scope.mediaCategory,client:scope.ClientName,fileId:scope.fileId },function(data) {
 					  scope.partnerNames=data; 					  
 					 if(scope.partnerNames.length>0){
 						  scope.partnerNames.push({partnerName:"All"});
 						$("#partnerN").removeAttr("disabled");
 						scope.activityMonths=null;
						scope.totalRA="";
						$("#activityM").attr("disabled","disabled");
 					  }else{
 						 $("#partnerN").attr("disabled","disabled");
 						  scope.activityMonths=null;
						$("#activityM").attr("disabled","disabled"); 
 					  }
 			      });
 				 }
 			  };
 			  
 			  scope.getPartnerTypeCategory=function(value){
 	 	        	scope.partnerType=value;
 	 	        	scope.formData.partnerName=null;
 	 	        	scope.formData.activityDate=null;
 	 	        	scope.totalRA="";
 	 	        	scope.formData.totalRA=null;
 	 	        	scope.partnerNames=[];
 	 	        	scope.distributionDatas=[];
					scope.distribution=[];
 	 	        	$("#activityM").attr("disabled","disabled"); 
 	 	        	$("#partnerN").attr("disabled","disabled");
 	 	        	/*if(scope.ClientName == "All"){
 	 					 resourceFactory.getPartnerName.get({partnertype: scope.partnerType,mediaCategory: scope.mediaCategory,client:scope.ClientName,fileId:scope.fileId },function(data) {
 	     					  scope.partnerNames=data;
 	     				
 	     					  if(scope.partnerNames == null || scope.partnerNames == ""){
 	        						 $("#partnerN").attr("disabled","disabled"); 
 	        						scope.activityMonths=null;
 	        						scope.totalRA="";
 	        					  }else{
 	        						$("#partnerN").removeAttr("disabled");
 	        						scope.activityMonths=null;
 	        						scope.totalRA="";
 	        					  }
 	     			      });
 	 				 }*/ if(scope.partnerType==1){
 	 					scope.partnerNames.push({partnerName:"All"});
 	 					$("#partnerN").removeAttr("disabled");
 	 				 }else{ 
 	 					if(scope.mediaCategory==null){
 	 						 scope.mediaCategory=1;
 	 						 }else{}
 	 				  resourceFactory.getPartnerName.get({partnertype: scope.partnerType,mediaCategory: scope.mediaCategory,client:scope.ClientName,fileId:scope.fileId },function(data) {
 	 					  scope.partnerNames=data;
 	 					  if(scope.partnerNames.length>0){
 	 						  scope.partnerNames.push({partnerName:"All"});
 	 						$("#partnerN").removeAttr("disabled");
 	 					  }else{
 	 						 $("#partnerN").attr("disabled","disabled");
 	 					  }
 	 			      });
 	 				 }
 	 	        };
 			  
 		   scope.getpartnerName=function(value){
					scope.partnerName=value;
					scope.formData.activityDate=null;
					scope.distributionDatas=[];
					scope.distribution=[];
					scope.totalRA="";
	 	        	scope.formData.totalRA=null;
	 	        	$("#activityM").attr("disabled","disabled");
					 /* if(scope.ClientName == "All"){
						 
						 resourceFactory.getActivityMonth.get({mediaCategory: scope.mediaCategory,partnertype: scope.partnerType,partnerName: scope.partnerName,client:scope.ClientName,fileId:scope.fileId },function(data) {
        					  scope.activityMonths=data;
        					  scope.totalRA="";
        					  if(scope.activityMonths == null || scope.activityMonths == ""){
        						  $("#activityM").attr("disabled","disabled"); 
        					  }else{
        						$("#activityM").removeAttr("disabled");
        					  }
        			      });
					 
					 }*/ if( scope.partnerName=="All"&& scope.partnerType!=null ){
     	        	 resourceFactory.getActivityMonthWithFileId.get({client: scope.ClientName,fileId:scope.fileId},function(data){
     	        		 scope.activityMonths=data;
     	        		 $("#activityM").removeAttr("disabled");
     	        	 });
     				
					 }
	     				
					 else{
						 resourceFactory.getActivityMonth.get({mediaCategory: scope.mediaCategory,partnertype: scope.partnerType,partnerName: scope.partnerName,client:scope.ClientName,fileId:scope.fileId },function(data) {
    					  scope.activityMonths=data;
    					  if(scope.activityMonths.length>0){
    						  $("#activityM").removeAttr("disabled");
    					  }else{
    						  $("#activityM").attr("disabled","disabled");
    					  }
    			      });
					 }
				};  
				
			  scope.getTableData=function(value){
				scope.monthId=value;
				if(scope.mediaCategory>1&&scope.ClientName!="All"&&scope.partnerType!= undefined&&scope.partnerName!="All"){
					scope.totalRA="";
				  scope.getDisbursementsData=function(offset, limit, callback){
 				  resourceFactory.getDisbursementsData.get({month:scope.monthId, partnerName: scope.partnerName,partnertypeId: scope.partnerType,mediaCategory: scope.mediaCategory,
 					                              client:scope.ClientName,fileId:scope.fileId,offset: offset, limit: limit},function(data) {
 					  scope.distribution=data.pageItems;
 					  scope.totalRA=data.totalRoyalty.totalRoyaltyAmount;
 					   callback(data);
 					      });
				  };
 				 scope.distributionDatas=PaginatorService.paginate(scope.getDisbursementsData, 49);
 				  
				}else if(scope.ClientName == "All"){
					 if(scope.mediaCategory==null){
						  scope.mediaCategory=1;
					  }
					 if(scope.partnerType==undefined){
						  scope.partnerType=1;
					  }
					 if(scope.partnerName==null){
						 scope.partnerName="All";
					 }
					 scope.totalRA="";
					 scope.getDisbursementsDatas=function(offset, limit, callback){
					 resourceFactory.getDisbursementsDatas.get({month:scope.monthId, partnerName: scope.partnerName,partnertypeId: scope.partnerType,mediaCategory: scope.mediaCategory,
						        fileId:scope.fileId ,offset: offset, limit: limit},function(data) {
 					  scope.distribution=data.pageItems;
 					  scope.totalRA=data.totalRoyalty.totalRoyaltyAmount;
 					  callback(data);
 			         }); 
					 };
					 scope.distributionDatas=PaginatorService.paginate(scope.getDisbursementsDatas, 49);
					 
				 }else if(scope.partnerName!=null&&scope.partnerType>1){
						 scope.totalRA="";
						 scope.getDisbursementsPartners=function(offset, limit, callback){
						 resourceFactory.getDisbursementsPartners.get({month:scope.monthId, client:scope.ClientName,fileId:scope.fileId,partnertypeId: scope.partnerType,
							 partnerName: scope.partnerName,offset: offset, limit: limit},function(data) {
	     					  scope.distribution=data.pageItems;
	     					  scope.totalRA=data.totalRoyalty.totalRoyaltyAmount;
								  callback(data);
					 });
					};
						 scope.distributionDatas=PaginatorService.paginate(scope.getDisbursementsPartners, 49);	

					 }else {
				  
				  if(scope.mediaCategory==null){
					  scope.mediaCategory=1;
				  }else{}
					 scope.totalRA="";
					 scope.getDisbursements=function(offset, limit, callback){
				    resourceFactory.getDisbursements.get({month:scope.monthId, client:scope.ClientName,fileId:scope.fileId ,
				    	mediaCategory: scope.mediaCategory,offset: offset, limit: limit},function(data) {
 					    scope.distribution=data.pageItems;
 					    scope.totalRA=data.totalRoyalty.totalRoyaltyAmount;
				    		  callback(data);
			        });
			      };
					 scope.distributionDatas=PaginatorService.paginate(scope.getDisbursements, 49);
					
			       }				
				
			};  
			  
			
	        scope.setDisbursementsScreen =function(){
	        	resourceFactory.mediaSettlementTemplateResource.get({},function(data){
	        		  scope.partnerTypeDatas = data.partnerTypeData;
	        		   scope.mediaCategoryDatass = [{mediaCategory:"All",mediaCategoryId:01}];
	        		   scope.partnerNames= [{partnerName:"All"}];
	        		   scope.partnerTypeDatas.push({id:01,mCodeValue:"All"});
			            scope.clientNames = data.clients;
			            scope.clientNames.push({client : "All"});
			            scope.fileIds = data.fileIds;
 			            scope.formData.fileId = scope.fileIds[0];
			            scope.formData.patnerType=scope.partnerTypeDatas[4].id;
			           scope.formData.mediaCategory=scope.mediaCategoryDatass[0].mediaCategoryId;
			           scope.formData.partnerName = scope.partnerNames[0].partnerName;
	        	});
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
        	  window.open('https://localhost:9554/obsplatform/api/v1/mediasettlements/'+id+'/print?tenantIdentifier=default');
      	  };
	  }
  });
  mifosX.ng.application.controller('CreateGameRoyaltyController', ['$scope', 'ResourceFactory', '$location','dateFilter','webStorage','PaginatorService','$notification', mifosX.controllers.CreateGameRoyaltyController]).run(function($log) {
    $log.info("CreateGameRoyaltyController initialized");
  });
}(mifosX.controllers || {}));
