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
	                    
	    
					
								
					scope.buttons = [{
						
		                  name:"button.editPartner",
		              	  href:"#/editmapgamedetails",
		              	  icon:"icon-edit"
		                 },
		                 {
                             name:"button.agreement",
                             href:"#/agreement",
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
			  
		        
		        scope.getpartnerIdentityDocuments = function () {
		            resourceFactory.partnerResource.getAllPartnerDocuments({partnerId: routeParams.id, anotherresource: 'identifiers'} , function(data) {
		                scope.identitydocuments = data;
		                for(var i = 0; i<scope.identitydocuments.length; i++) {
		                  resourceFactory.partnerIdentifierResource.get({clientIdentityId: scope.identitydocuments[i].id} , function(data) {
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
		        
		  }
	  });
	  mifosX.ng.application.controller('ViewPartnerAccountController', ['$scope','$routeParams', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage','$modal', mifosX.controllers.ViewPartnerAccountController]).run(function($log) {
	    $log.info("ViewPartnerAccountController initialized");
	  });
	}(mifosX.controllers || {}));