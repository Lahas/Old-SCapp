(function(module){ 
  mifosX.controllers = _.extend(module, {
    ViewClientController: function(scope,webStorage, routeParams , route, location, resourceFactory,paginatorService, http,$modal,dateFilter) {
    	 scope.client = [];
         scope.error = {};
         scope.identitydocuments = [];
         scope.buttons = [];
         scope.clientdocuments = [];
         scope.staffData = {};
         scope.orders = [];
         scope.formData = {};
 		scope.start = {};
         scope.start.date = new Date();
        
         
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
 		  else if(scope.displayTab == "Tickets"){
 			  scope.TicketsTab = true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "hardware"){
 			  scope.hardwareTab =  true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "Sale"){
 			  scope.SaleTab =  true;
 			  webStorage.remove('callingTab');
 		  }else if(scope.displayTab == "Statements"){
 			  scope.StatementsTab =  true;
 			  webStorage.remove('callingTab');
 		  }else if(scope.displayTab == "operator"){
 			  scope.operatorTab =  true;
 			  webStorage.remove('callingTab'); 
 		  }else if(scope.displayTab == "revenueShare"){
 			  scope.royaltyTab =  true;
 			  webStorage.remove('callingTab'); 
 		  }else{
 			  scope.operatorTab =  true;
 			  webStorage.remove('callingTab');
 		  }

 		 
         }
        
        var getDetails = function(){
        	
        	resourceFactory.clientResource.get({clientId: routeParams.id} , function(data) {
                scope.orders = [];
                    scope.client = data;
                    scope.statusActive=scope.client.status.code;
                                
                    webStorage.add("clientData", {balanceAmount: data.balanceAmount, displayName: data.displayName,
                     statusActive: scope.statusActive, accountNo: data.accountNo, officeName: data.officeName,
                     currency: data.currency, imagePresent: data.imagePresent,categoryType:data.categoryType,clientId:data.id });
                    
                    scope.staffData.staffId = data.staffId;
                    if (data.imagePresent) {
                      http({
                        method:'GET',
                        url: 'https://localhost:9554/obsplatform/api/v1/clients/'+routeParams.id+'/images'
                      }).then(function(imageData) {
                        scope.image = imageData.data;
                      });
                    }
                    if (data.status.value == "Pending") {
                      scope.buttons = [{
                                        name:"button.edit",
                                        href:"#/editclient",
                                        icon :"icon-edit"
                                      },
                                      {
                                        name:"button.activate",
                                        href:"#/client",
                                        subhref:"activate",
                                        icon :"icon-ok-sign"
                                      }]
                                    
                      }

                    if (data.status.value == "Active") {
                      scope.buttons = [{
                                          name:"button.eventgame",
                                      	  href:"#/gameevent",
                                      	  icon:"icon-play"
                                         },
                                          {
                                            name:"button.payments",
                                            href:"#/payments",
                                            icon :"icon-money"
                                         },
                                         {
                                             name:"button.payInvoice",
                                             href:"#/payinvoice",
                                             icon :"icon-usd"
                                          },
                                          {
                                              name:"button.distribution",
                                              href:"#/creditDistribution",
                                              icon :"icon-usd"
                                           },
                                        /* {
                                             name:"button.adjustments",
                                             href:"#/adjustments",
                                             icon :"icon-adjust"
                                         },*/
                                         {
                                             name:"button.invoice",
                                             href:"#/clientinvoice",
                                             icon :"icon-play"
                                          },
                                          {
                                             name:"button.statement",
                                             href:"#/statement",
                                             icon :"icon-file"
                                         },
                                           
                                     
                                        {
                                        name:"button.edit",
                                        href:"#/editclient",
                                        icon :"icon-edit"
                                      }]
                    }

                    if (data.status.value == "Transfer in progress") {
                      scope.buttons = [{
                                        name:"button.accept.transfer",
                                        href:"#/client",
                                        subhref:"acceptclienttransfer",
                                        icon :"icon-check-sign"
                                      },
                                      {
                                        name:"button.reject.transfer",
                                        href:"#/client",
                                        subhref:"rejecttransfer",
                                        icon :"icon-remove"
                                      },
                                      {
                                        name:"button.undo.transfer",
                                        href:"#/client",
                                        subhref:"undotransfer",
                                        icon :"icon-undo"
                                      }]
                    }

                    if (data.status.value == "Transfer on hold") {
                      scope.buttons = [{
                                        name:"button.undo.transfer",
                                        href:"#/client",
                                        subhref:"undotransfer",
                                        icon :"icon-undo"
                                      }]
                    }
                  
                  resourceFactory.getOrderResource.getAllOrders({clientId: routeParams.id} , function(data) {
                      scope.orders = data.clientOrders;
                  });
                });
        	
        };
        
        getDetails();
        
        var Approve = function($scope,$modalInstance){
			$scope.accept = function(date){
			        	scope.formData.locale = 'en';
			        	var reqDate = dateFilter(date,'dd MMMM yyyy');
			            scope.formData.dateFormat = 'dd MMMM yyyy';
			            scope.formData.systemDate=reqDate;
			            resourceFactory.clientInvoiceResource.save({'clientId': routeParams.id},scope.formData,function(data,putResponseHeaders){
			            	$modalInstance.close('delete');
			            	getDetails();
			          },function(errData){
			        	  $scope.error = errData.data.errors[0].userMessageGlobalisationCode;
			        	  
			        	  
			          });
			        
			};
			$scope.reject = function(){
				$modalInstance.dismiss('cancel');
			};
		};
        
		
		scope.getGameEventOrderData = function(){
			
			  resourceFactory.eventOrderGameResource.get({clientId: routeParams.id}, function(data) {
		            scope.eventOrderData = data.eventOrdersData; 
		        });
		};
		
		
		scope.getOperatorDeductionData = function(){
			resourceFactory.operatorDeductionResource.get({clientId: routeParams.id}, function(data) {
	            scope.operatorDeductionDatas = data;
	        });
		};
		
		
		 scope.routeTo = function(id){
	          location.path('/editoperatordeduction/'+ id);
	       
		 };
        
        
      scope.cancel = function(){
  		  webStorage.add("callingTab", {someString: "royaltyTab" });
      };
  	  
      scope.getRoyaltyType = function () {
          resourceFactory.revenueDetails.get({clientId: routeParams.id} , function(data) {
             scope.royaltyTypes = data;                        
          });
      };
      
      scope.routeToRevenue=function(id){
   
    	  location.path('/editrevenushare/'+id);
      };
        
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
        
 var StatementPopController = function($scope,$modalInstance){
        	
        	$scope.start = {};
        	
            $scope.start.date = new Date();
        	$scope.acceptStatement = function(){
        		console.log("Accept Statement");
        		
        		
        		this.formData.locale = 'en';
   	         	var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
   	         	this.formData.dateFormat = 'dd MMMM yyyy';
   	         	this.formData.dueDate=reqDate;
        		
        		resourceFactory.statementResource.save({'clientId': routeParams.id},this.formData,function(data) {
                    location.path('/billmaster/' +routeParams.id);
                    $modalInstance.close('delete');
                },function(errorData){
                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
                	console.log(errorData);
                	console.log($scope.stmError);
                });
        	};
        	$scope.rejectStatement = function(){
        		console.log("Reject Statement");
        		$modalInstance.dismiss('cancel');
        	};
        };
        
        
        
        scope.deleteClient = function () {
            $modal.open({
                templateUrl: 'deleteClient.html',
                controller: ClientDeleteCtrl
            });
        };
        scope.unassignStaffCenter = function () {
            $modal.open({
                templateUrl: 'clientunassignstaff.html',
                controller: ClientUnassignCtrl
            });
        };
        var ClientDeleteCtrl = function ($scope, $modalInstance) {
            $scope.delete = function () {
                resourceFactory.clientResource.delete({clientId: routeParams.id}, {}, function(data){
                    location.path('/clients');
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        var ClientUnassignCtrl = function ($scope, $modalInstance) {
            $scope.unassign = function () {
                resourceFactory.clientResource.save({clientId: routeParams.id, command : 'unassignstaff'}, scope.staffData,function(data){
                    route.reload();
                });
                $modalInstance.close('unassign');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        resourceFactory.clientNotesResource.getAllNotes({clientId: routeParams.id} , function(data) {
            scope.clientNotes = data;
        });
        scope.getClientIdentityDocuments = function () {
          resourceFactory.clientResource.getAllClientDocuments({clientId: routeParams.id, anotherresource: 'identifiers'} , function(data) {
              scope.identitydocuments = data;
              for(var i = 0; i<scope.identitydocuments.length; i++) {
                resourceFactory.clientIdentifierResource.get({clientIdentityId: scope.identitydocuments[i].id} , function(data) {
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

        scope.getClientTemplateDocuments = function() {
          resourceFactory.templateResource.get({entityId : 0, typeId : 0}, function(data) {
            scope.clientTemplateData = data;
          })
        };

        /*scope.getTransactionHistory = function () {
            resourceFactory.transactionHistoryResource.getTransactionHistory({clientId: routeParams.id} , function(data) {
              scope.transactionhistory = data;
            });
          };*/
        
        scope.getTransactionHistoryFetchFunction = function(offset, limit, callback) {
  			resourceFactory.transactionHistoryResource.getTransactionHistory({clientId: routeParams.id ,offset: offset, limit: limit} , callback);
  			};
          scope.getTransactionHistory = function () {
          	scope.transactionhistory = paginatorService.paginate(scope.getTransactionHistoryFetchFunction, 14);
          };
  
          scope.searchTransactionHistory123 = function(offset, limit, callback) {
	    	  resourceFactory.transactionHistoryResource.getTransactionHistory({ clientId: routeParams.id ,
	    		  offset: offset, limit: limit ,sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchTransactionHistory = function(filterText) {
	  			scope.transactionhistory = paginatorService.paginate(scope.searchTransactionHistory123, 14);
	  		}; 
        
        
        
        scope.getClientTemplate = function(templateId) {
          scope.selectedTemplate = templateId;
          http({
            method:'POST',
            url: 'https://localhost:9554/obsplatform/api/v1/templates/'+templateId+'?clientId='+routeParams.id,
            data: {}
          }).then(function(data) {
            scope.template = data.data;
          });
        }

       /* resourceFactory.DataTablesResource.getAllDataTables({apptable: 'm_client'} , function(data) {
          scope.clientdatatables = data;
        });*/
        
        scope.getClientStatements = function () {
            resourceFactory.statementResource.get({clientId: routeParams.id} , function(data) {	
                   scope.states = data;
                  
                 });
               };
               
               scope.getClientAssociation = function () {
                   resourceFactory.associationResource.get({clientId: routeParams.id} , function(data) {	
                          scope.associations = data;
                         
                        });
                      };        
               

         scope.downloadFile = function (statementId){
              window.open('https://localhost:9554/obsplatform/api/v1/billmaster/'+statementId+'/print?tenantIdentifier=default');
         };
         scope.getAllTickets=function(){      
               resourceFactory.ticketResource.getAll({clientId: routeParams.id},function(data) {	        
   	            scope.tickets = data;
   	            scope.clientId= routeParams.id;	  
   	        });
         };

               scope.getOneTimeSale = function () {
                   resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId: routeParams.id} , function(data) {
                     scope.onetimesales = data.oneTimeSaleData;
                   });
                 };
        scope.dataTableChange = function(clientdatatable) {
          resourceFactory.DataTablesResource.getTableDetails({datatablename: clientdatatable.registeredTableName,
          entityId: routeParams.id, genericResultSet: 'true'} , function(data) {
            scope.datatabledetails = data;
            scope.datatabledetails.isData = data.data.length > 0 ? true : false;
            scope.datatabledetails.isMultirow = data.columnHeaders[0].columnName == "id" ? true : false;

            for(var i in data.columnHeaders) {
              if (scope.datatabledetails.columnHeaders[i].columnCode) {
                for (var j in scope.datatabledetails.columnHeaders[i].columnValues){
                  for(var k in data.data) {
                    if (data.data[k].row[i] == scope.datatabledetails.columnHeaders[i].columnValues[j].id) {
                      data.data[k].row[i] = scope.datatabledetails.columnHeaders[i].columnValues[j].value;
                    }
                  }
                }
              } 
            }

          });
        };

        scope.deleteAll = function (apptableName, entityId) {
          resourceFactory.DataTablesResource.delete({datatablename:apptableName, entityId:entityId, genericResultSet:'true'}, {}, function(data){
            route.reload();
          });
        };

        scope.getClientDocuments = function () {
          resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId: routeParams.id} , function(data) {
            scope.clientdocuments = data;
          });
        };

        scope.deleteDocument = function (documentId, index) {
          resourceFactory.clientDocumentsResource.delete({clientId: routeParams.id, documentId: documentId}, '', function(data) {
            scope.clientdocuments.splice(index,1);
          });
        };

        scope.downloadDocument = function(documentId) {
            resourceFactory.clientDocumentsResource.get({clientId: routeParams.id, documentId: documentId}, '', function(data) {
                scope.clientdocuments.splice(index,1);
            });
        };
        scope.isNotClosed = function(loanaccount) {
          if(loanaccount.status.code === "loanStatusType.closed.written.off" || 
            loanaccount.status.code === "loanStatusType.rejected") {
            return false;
          } else{
             return true;
          }
        };

        scope.isClosed = function(loanaccount) {
          if(loanaccount.status.code === "loanStatusType.closed.written.off" || 
            loanaccount.status.code === "loanStatusType.rejected") {
            return true;
          } else{
             return false;
          }
        };
        
        scope.getAllOwnHardware = function () {
            resourceFactory.HardwareResource.getAllOwnHardware({clientId: routeParams.id} , function(data) {
              scope.ownhardwares = data;
            });
        };
        
        scope.cancelSale = function(otsId,index){
        	resourceFactory.deleteOneTimeSaleResource.update({saleId: otsId} , function(data) {
        		scope.onetimesales.splice(index, 1);
        		getDetails();
            },function(errorData){
            	
            });
        };
        
        /*scope.getAllFineTransactions = function () {
              resourceFactory.FineTransactionResource.getAllFineTransactions({clientId: routeParams.id} , function(data) {
                scope.financialtransactions = data;
                
                
             });
            };*/
          
          scope.getFinancialTransactionsFetchFunction = function(offset, limit, callback) {
  			resourceFactory.FineTransactionResource.getAllFineTransactions({clientId: routeParams.id ,offset: offset, limit: limit} , callback);
  			};
          scope.getAllFineTransactions = function () {
          	scope.financialtransactions = paginatorService.paginate(scope.getFinancialTransactionsFetchFunction, 14);
          };
          
          
          scope.searchFinancialTransactions123 = function(offset, limit, callback) {
	    	  resourceFactory.FineTransactionResource.getAllFineTransactions({ clientId: routeParams.id ,
	    		  offset: offset, limit: limit ,sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchFinancialTransactions = function(filterText) {
	  			scope.financialtransactions = paginatorService.paginate(scope.searchFinancialTransactions123, 14);
	  		};  
          


        scope.saveNote = function() {   
            resourceFactory.clientResource.save({clientId: routeParams.id, anotherresource: 'notes'}, this.formData , function(data){
            var today = new Date();
            temp = { id: data.resourceId , note : scope.formData.note , createdByUsername : "test" , createdOn : today } ;
            scope.clientNotes.push(temp);
            scope.formData.note = "";
            scope.predicate = '-id';
          });
        }

        scope.deleteClientIdentifierDocument = function (clientId, entityId, index){
          resourceFactory.clientIdenfierResource.delete({clientId: clientId, id: entityId}, '', function(data) {
            scope.identitydocuments.splice(index,1);
          });
        };

        scope.downloadClientIdentifierDocument=function (identifierId, documentId){
          console.log(identifierId,documentId);
        };

		// *********************** InVenture controller ***********************
        scope.fetchInventureScore = function(){
          // dummy data for the graph - DEBUG purpose
          var inventureScore = getRandomInt(450,800);
          var natAverage = getRandomInt(450,800);
          var industryAverage = getRandomInt(450,800);
          var inventureMinScore = 300;
          var inventureMaxScore = 850;

          // dummy data for inventure loan recommendation - DEBUG purpose
          scope.inventureAgricultureLimit = '21,000';
          scope.inventureFishermenLimit = '27,500';
          scope.inventureHousingLimit = '385,000';
          scope.inventureBusinessLimit = '10,000';

          // this part is used to generate data to see the look of the graph
          function getRandomInt (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          // CHART1 - comparison chart control
          var comparisonData = [
            {
              key: "Score Comparison",
                values: [
                  { 
                    "label" : "National Average",
                    "value" : (natAverage)
                  }, 
                  { 
                    "label" : "Agriculture Average", 
                    "value" : (industryAverage)
                  }, 
                  { 
                    "label" : "This Client", 
                    "value" : (inventureScore)
                  }
                ]
              }
            ];

          // add the comparison chart to the viewclient.html
          nv.addGraph(function() {
            var comparisonChart = nv.models.discreteBarChart()
              .x(function(d) { return d.label })
              .y(function(d) { return d.value })
              .staggerLabels(true)
              .tooltips(true)
              .showValues(true);
                
            // set all display value to integer
            comparisonChart.yAxis.tickFormat(d3.format('d'));
            comparisonChart.valueFormat(d3.format('d'));
            comparisonChart.forceY([inventureMinScore, inventureMaxScore]);

            d3.select('#inventureBarChart svg')
              .datum(comparisonData)
              .transition().duration(1500)
              .call(comparisonChart);

            nv.utils.windowResize(comparisonChart.update);
            return comparisonChart;
          });

          // CHART2 - inventure score bullet chart control
          nv.addGraph(function() {  
            var bullet = nv.models.bulletChart()
              .tooltips(false);

            d3.select('#inventureBulletChart svg')
              .datum(scoreData())
              .transition().duration(1500)
              .call(bullet);

            nv.utils.windowResize(bullet.update);
            return bullet;
          });

          function scoreData() {
            return {
              "title": "",
              "ranges": [(inventureMinScore - 300), (inventureMaxScore - 300)],
              "measures": [(inventureScore - 300)],
              "markers": [(inventureScore - 300)]};	
          }

          // this will be used to display the score on the viewclient.html
          scope.inventureScore = inventureScore;
        };
    }
  });
  mifosX.ng.application.controller('ViewClientController', ['$scope','webStorage', '$routeParams', '$route', '$location', 'ResourceFactory', 'PaginatorService','$http','$modal','dateFilter', mifosX.controllers.ViewClientController]).run(function($log) {
    $log.info("ViewClientController initialized");
  });
}(mifosX.controllers || {}));
