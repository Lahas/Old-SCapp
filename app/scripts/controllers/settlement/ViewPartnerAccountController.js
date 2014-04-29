(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewPartnerAccountController: function(scope,routeParams, resourceFactory, location,dateFilter,validator,http,webStorage,$modal) {
			  
			 // scope.resouresId=routeParams.id;
			  scope.buttons = [];
			  scope.partner = [];
			  
			  resourceFactory.viewpartnerAccountResource.getAll({partnerId: routeParams.id} ,function(data) {
				    scope.partner = data;
					scope.partnerName=data.partnerName;
					scope.partnerTypeName=data.partnerTypeName;
					scope.contactNum=data.contactNum;
					scope.emailId=data.emailId;
					scope.externalId=data.externalId;
					scope.currencyName=data.currencyName;
					scope.partnerAddress=data.partnerAddress;
					
					 webStorage.add("partnerData", {partnerName: data.partnerName, partnerTypeName: data.partnerTypeName,
						externalId: data.externalId, emailId: data.emailId,
	                     partnerAddress: data.partnerAddress, currencyName: data.currencyName,partnerId:data.id });
	                    
					 
					   var callingTab = webStorage.get('callingTab',null);
				         if(callingTab == null){
				         	callingTab="";
				         }else{
				 		  scope.displayTab=callingTab.someString;
				 		 
				 		  if( scope.displayTab == "identities"){
				 			 
				 			  scope.identitiesTab = true;
				 			  webStorage.remove('callingTab');
				 		  }
				 		  else if(scope.displayTab == "documents"){
				 			  
				  			  scope.documentsTab = true;
				 			  webStorage.remove('callingTab');
				 		  }
				 		  else{
				 			  scope.operatorTab =  true;
				 			  webStorage.remove('callingTab');
				 		  }

				 		 
				         }
							
					scope.buttons = [{
						
		                  name:"button.editPartner",
		              	  href:"#/editmapgamedetails",
		              	  icon:"icon-edit"
		                 },
		                 {
                             name:"button.agreement",
                             href:"#/agreement",
                             icon :"icon-file"
                         },
                         {
                             name:"button.purchaseorder",
                             href:"#/purchaseorder",
                             icon :"icon-file"
                         }
		             
		               ];
					
					
					
			  });
			  
			  
			  scope.getMe = function(href,cId,subHref){
		        	var url = href.replace("#","")+"/"+cId+""+(subHref==undefined?"":"/"+subHref);
		        	console.log(url);
		        	if(href=="#/clientinvoice"){
		        		$modal.open({
		                    templateUrl: 'approve1.html',
		                    controller: Approve,
		                    resolve:{}
		                });
		        	}else if(href=="#/statement"){
		        		$modal.open({
		                    templateUrl: 'StatementPop.html',
		                    controller: StatementPopController,
		                    resolve:{}
		                });
		        	}else{
		        		location.path(url);
		        	}
		        };
			  
		        resourceFactory.partnerNotesResource.getAllNotes({partnerId: routeParams.id} , function(data) {
		            scope.partnerNotes = data;
		        });
		        
		        
		        scope.getPartnerIdentityDocuments = function () {
		       
		            resourceFactory.partnerResource.getAllPartnerDocuments({partnerId: routeParams.id, anotherresource: 'identifiers'} , function(data) {
		                scope.identitydocuments = data.identifierData;
		                for(var i = 0; i<scope.identitydocuments.length; i++) {
		                  resourceFactory.partnerIdentifierResource.get({partnerIdentityId: scope.identitydocuments[i].id} , function(data) {
		                    for(var j = 0; j<scope.identitydocuments.length; j++) {
		                       if(data.length > 0 && scope.identitydocuments[j].id == data[0].parentEntityId)
		                        {
		                          scope.identitydocuments[j].documents = data;
		                        }
		                    }
		                  });
		                }
		            });
		          };        
		          
		          scope.deletePartnerIdentifierDocument = function (partnerId, entityId, index){
		              resourceFactory.partnerIdenfierResource.delete({partnerId: partnerId, id: entityId}, '', function(data) {
		                scope.identitydocuments.splice(index,1);
		              });
		            };

		            scope.downloadPartnerIdentifierDocument=function (identifierId, documentId){
		              console.log(identifierId,documentId);
		            };

		            scope.downloadDocument = function (id){ 
			        	  window.open('https://localhost:9554/obsplatform/api/v1/mediasettlements/'+id+'/print?tenantIdentifier=default');
			      	  };
		          
		          scope.getPartnerDocuments = function () {
		              resourceFactory.partnerAgreementResource.getAllfiles({partnerId: routeParams.id} , function(data) {
		                scope.clientdocuments = data;
		                for(var i in scope.clientdocuments){
		                	if(scope.clientdocuments[i].fileName != undefined){
		                		scope.filename = true;
		                		break;
		                	}
		                }
		                
		              });
		            };
		            
		            
		            scope.deleteDocument = function (documentId, index) {
		            	resourceFactory.deletepartnerAgreementResource.delete({documentId: documentId} , {} , function(data) {
		                  scope.clientdocuments.splice(index,1);
		                });
		              };
		          
		            scope.saveNote = function() {   
		                resourceFactory.partnerNoteResource.save({partnerId: routeParams.id, anotherresource: 'notes'}, this.formData , function(data){
		                var today = new Date();
		                temp = { id: data.resourceId , note : scope.formData.note , createdByUsername : scope.userName , createdOn : today } ;
		                scope.partnerNotes.push(temp);
		                scope.formData.note = "";
		                scope.predicate = '-id';
		              });
		            };          
		          
		        
		  }
	  });
	  mifosX.ng.application.controller('ViewPartnerAccountController', ['$scope','$routeParams', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage','$modal', mifosX.controllers.ViewPartnerAccountController]).run(function($log) {
	    $log.info("ViewPartnerAccountController initialized");
	  });
	}(mifosX.controllers || {}));