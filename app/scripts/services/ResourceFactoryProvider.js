(function(module) {
  mifosX.services = _.extend(module, {
    ResourceFactoryProvider: function() {
      var baseUrl = "" , apiVer = "/obsplatform/api/v1";
      this.setBaseUrl = function(url) {baseUrl = url;};
      this.$get = ['$resource','$rootScope', function(resource,$rootScope) {
        var defineResource = function(url, paramDefaults, actions) {
        	var tempUrl = baseUrl;
        	$rootScope.hostUrl = tempUrl;
          return resource(baseUrl + url, paramDefaults, actions);
        };
        return {
          userResource: defineResource(apiVer + "/users/:userId", {}, {
            getAllUsers: {method: 'GET', params: {fields: "id,firstname,lastname,username,officeName"}, isArray: true}
          }),
          roleResource: defineResource(apiVer + "/roles/:roleId", {}, {
            getAllRoles: {method: 'GET', params: {}, isArray: true}
          }),
          rolePermissionResource: defineResource(apiVer + "/roles/:roleId/permissions", {roleId:'@roleId'}, {
            get: {method: 'GET', params: {}},
            update: {method: 'PUT'}
          }),
          permissionResource: defineResource(apiVer + "/permissions", {}, {
            get: {method: 'GET', params: {}, isArray: true},
            update: {method: 'PUT'}
          }),
          officeResource: defineResource(apiVer + "/offices/:officeId", {officeId:"@officeId"}, {
            getAllOffices: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT'}
          }),
          clientResource: defineResource(apiVer + "/clients/:clientId/:anotherresource", {clientId:'@clientId',anotherresource:'@anotherresource'}, {
            getAllClients: {method: 'GET', params: {}},
            getClientClosureReasons: {method: 'GET', params: {}},
            getAllClientDocuments: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT'}
          }),
          clientIdentifierResource: defineResource(apiVer + "/client_identifiers/:clientIdentityId/documents", {clientIdentityId:'@clientIdentityId'}, {
            get: {method: 'GET', params: {}, isArray:true}
          }),
          clientDocumentsResource: defineResource(apiVer + "/clients/:clientId/documents/:documentId", {clientId:'@clientId',documentId:'@documentId'}, {
            getAllClientDocuments: {method: 'GET', params: {}, isArray: true}
          }),
          clientAccountResource: defineResource(apiVer + "/clients/:clientId/accounts", {clientId:'@clientId'}, {
            getAllClients: {method: 'GET', params: {}}
          }),
          clientNotesResource: defineResource(apiVer + "/clients/:clientId/notes", {clientId:'@clientId'}, {
            getAllNotes: {method: 'GET', params: {}, isArray:true}
          }),
          clientTemplateResource: defineResource(apiVer + "/clients/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          clientIdenfierTemplateResource: defineResource(apiVer + "/clients/:clientId/identifiers/template", {clientId:'@clientId'}, {
            get: {method: 'GET', params: {}}
          }),
          clientIdenfierResource: defineResource(apiVer + "/clients/:clientId/identifiers/:id", {clientId:'@clientId', id: '@id'}, {
            get: {method: 'GET', params: {}}
          }),
          groupResource: defineResource(apiVer + "/groups/:groupId/:anotherresource", {groupId:'@groupId',anotherresource:'@anotherresource'}, {
              get: {method: 'GET', params: {}},
              update: { method: 'PUT'}
          }),
          groupSummaryResource: defineResource(apiVer + "/runreports/:reportSource",{reportSource: '@reportSource'}, {
              getSummary: {method: 'GET', params: {}}
          }),
          groupAccountResource: defineResource(apiVer + "/groups/:groupId/accounts", {groupId:'@groupId'}, {
              getAll: {method: 'GET', params: {}}
          }),
          groupNotesResource: defineResource(apiVer + "/groups/:groupId/notes/:noteId", {groupId:'@groupId',noteId:'@noteId'}, {
              getAllNotes: {method: 'GET', params: {}, isArray:true}
          }),
          groupTemplateResource: defineResource(apiVer + "/groups/template", {}, {
              get: {method: 'GET', params: {}}
          }),
          groupMeetingResource:defineResource(apiVer + "/groups/:groupId/meetings/:templateSource", {groupId:'@groupId',templateSource:'@templateSource'}, {
              getMeetingInfo: {method:'GET', params: {}}
          }),
          attachMeetingResource:defineResource(apiVer + "/:groupOrCenter/:groupOrCenterId/calendars/:templateSource", {groupOrCenter:'@groupOrCenter', groupOrCenterId:'@groupOrCenterId',
          templateSource:'@templateSource'}, {
          }),
          runReportsResource: defineResource(apiVer + "/runreports/:reportSource", {reportSource : '@reportSource'}, {
            get: {method: 'GET', params: {}, isArray:true},
            getReport: {method: 'GET', params: {}}
          }),
          reportsResource: defineResource(apiVer + "/reports/:id/:resourceType", {id:'@id', resourceType:'@resourceType'}, {
            get: {method: 'GET', params: {id:'@id'}},
            getReport: {method: 'GET', params: {id:'@id'}, isArray:true},
            getReportDetails: {method: 'GET', params: {id:'@id'}},
            update: {method: 'PUT', params: {}}
          }),
          DataTablesResource: defineResource(apiVer + "/datatables/:datatablename/:entityId/:resourceId", {datatablename:'@datatablename',entityId:'@entityId', resourceId:'@resourceId'}, {
            getAllDataTables: {method: 'GET', params: {}, isArray:true},
            getTableDetails: {method: 'GET', params: {}},
            update: {method: 'PUT'}
          }),
          loanProductResource: defineResource(apiVer + "/loanproducts/:loanProductId/:resourceType", {resourceType:'@resourceType', loanProductId:'@loanProductId'}, {
            getAllLoanProducts: {method: 'GET', params: {}, isArray:true},
            getProductmix: {method: 'GET', params: {}},
            put: {method: 'PUT', params: {}}
          }),
          chargeResource: defineResource(apiVer + "/charges/:chargeId", {chargeId:'@chargeId'}, {
            getAllCharges: {method: 'GET', params: {}, isArray:true},
            getCharge: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}}
          }),
          chargeTemplateResource: defineResource(apiVer + "/charges/template", {
            get: {method: 'GET', params: {}, isArray:true},
            getChargeTemplates: {method: 'GET', params: {}},
          }),
          savingProductResource: defineResource(apiVer + "/savingsproducts/:savingProductId/:resourceType", {savingProductId:'@savingProductId', resourceType:'@resourceType'}, {
            getAllSavingProducts: {method: 'GET', params: {}, isArray:true},
            update: {method: 'PUT', params: {}}
          }),
          loanResource: defineResource(apiVer + "/loans/:loanId/:resourceType/:resourceId", {resourceType:'@resourceType', loanId:'@loanId', resourceId:'@resourceId'}, {
            getAllLoans: {method: 'GET', params: {}},
            put: {method: 'PUT', params: {}}
          }),
          loanChargeTemplateResource: defineResource(apiVer + "/loans/:loanId/charges/template", {loanId:'@loanId'}, {
            get: {method: 'GET', params: {}},
          }),
          loanCollateralTemplateResource: defineResource(apiVer + "/loans/:loanId/collaterals/template", {loanId:'@loanId'}, {
            get: {method: 'GET', params: {}},
          }),
          loanTrxnsTemplateResource: defineResource(apiVer + "/loans/:loanId/transactions/template", {loanId:'@loanId'}, {
              get: {method: 'GET', params: {}}
          }),
          loanTrxnsResource: defineResource(apiVer + "/loans/:loanId/transactions/:transactionId", {loanId:'@loanId', transactionId:'@transactionId'}, {
              get: {method: 'GET', params: {}}
          }),
          LoanAccountResource: defineResource(apiVer + "/loans/:loanId/:resourceType/:chargeId", {loanId:'@loanId', resourceType:'@resourceType', chargeId:'@chargeId'}, {
            getLoanAccountDetails: {method: 'GET', params: {}}
          }),
          LoanDocumentResource: defineResource(apiVer + "/loans/:loanId/documents/:documentId", {loanId:'@loanId',documentId:'@documentId'}, {
            getLoanDocuments: {method: 'GET', params: {} , isArray: true}
          }),
          currencyConfigResource: defineResource(apiVer + "/currencies", {}, {
            get: {method: 'GET', params: {}},
            update: { method: 'PUT'},
            upd: { method: 'PUT', params:{}, isArray:true}
          }),
          userListResource: defineResource(apiVer + "/users/:userId", {userId:'@userId'}, {
            getAllUsers: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT' }
          }),
          userTemplateResource: defineResource(apiVer + "/users/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          employeeResource: defineResource(apiVer + "/staff/:staffId", {staffId:'@staffId'}, {
            getAllEmployees: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT' }
          }),
          globalSearch: defineResource(apiVer + "/search", {query:'@query'}, {
            search: { method: 'GET',
                      params: { query: '@query'} ,
                      isArray:true
                    }
          }),
          fundsResource: defineResource(apiVer + "/funds/:fundId", {fundId:'@fundId'}, {
            getAllFunds: {method: 'GET', params: {}, isArray: true}
          }),
          accountingRulesResource: defineResource(apiVer + "/accountingrules/:accountingRuleId", {accountingRuleId:'@accountingRuleId'}, {
            getAllRules: {method: 'GET', params: {associations : 'all'}, isArray: true},
            getById: {method: 'GET', params: {accountingRuleId:'@accountingRuleId'}},
            get: {method: 'GET', params: {}, isArray: true},
            update: {method: 'PUT'}
          }),
          accountingRulesTemplateResource: defineResource(apiVer + "/accountingrules/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          accountCoaResource: defineResource(apiVer + "/glaccounts/:glAccountId", {glAccountId:'@glAccountId'}, {
            getAllAccountCoas: {method: 'GET', params: {}, isArray: true},
            update: { method: 'PUT' }
          }),
          accountCoaTemplateResource: defineResource(apiVer + "/glaccounts/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          journalEntriesResource: defineResource(apiVer + "/journalentries/:trxid", {trxid:'@transactionId'}, {
            get: {method: 'GET', params: {transactionId:'@transactionId'}},
            reverse: {method: 'POST', params:{command:'reverse'}},
            search:{method: 'GET', params: {}}
          }),
          accountingClosureResource: defineResource(apiVer + "/glclosures/:accId", {accId:"@accId"}, {
            get: {method: 'GET', params: {}, isArray:true},
            getView: {method: 'GET', params: {}}
          }) ,
          codeResources: defineResource(apiVer + "/codes/:codeId", {codeId:"@codeId"}, {
                getAllCodes: {method: 'GET', params: {}, isArray: true}
          }),
          codeValueResource: defineResource(apiVer + "/codes/:codeId/codevalues/:codevalueId", {codeId:'@codeId',codevalueId:'@codevalueId'}, {
            getAllCodeValues: {method: 'GET', params: {}, isArray:true},
            update: { method: 'PUT', params: {}, isArray:true }
          }),
          holResource: defineResource(apiVer + "/holidays", {}, {
              getAllHols: {method: 'GET', params: {}, isArray: true}
          }),
          holValueResource: defineResource(apiVer + "/holidays/:holId", {holId:'@holId'}, {
              getholvalues: {method: 'GET', params: {}}
          }),
          savingsTemplateResource: defineResource(apiVer + "/savingsaccounts/template", {}, {
              get: {method: 'GET', params: {}}
          }),
          savingsResource: defineResource(apiVer + "/savingsaccounts/:accountId/:resourceType/:chargeId",
            {accountId:'@accountId', resourceType:'@resourceType', chargeId:'@chargeId'}, {
              get: {method: 'GET', params: {}},
              update: {method: 'PUT'}
          }),
          savingsChargeResource: defineResource(apiVer + "/savingsaccounts/:accountId/charges/:resourceType",{accountId:'@accountId', resourceType:'@resourceType'}, {
              get: {method: 'GET', params: {}},
              update: {method: 'PUT'}
          }),
          savingsTrxnsTemplateResource: defineResource(apiVer + "/savingsaccounts/:savingsId/transactions/template", {savingsId:'@savingsId'}, {
              get: {method: 'GET', params: {savingsId:'@savingsId'}}
          }),
          savingsTrxnsResource: defineResource(apiVer + "/savingsaccounts/:savingsId/transactions/:transactionId", {savingsId:'@savingsId', transactionId:'@transactionId'}, {
              get: {method: 'GET', params: {savingsId:'@savingsId', transactionId:'@transactionId'}}
          }),
          accountTransferResource: defineResource(apiVer + "/accounttransfers/:transferId", {transferId:'@transferId'}, {
              get: {method: 'GET', params: {transferId:'@transferId'}}
          }),
          accountTransfersTemplateResource: defineResource(apiVer + "/accounttransfers/template", {}, {
              get: {method: 'GET', params: {}}
          }),
          centerAccountResource: defineResource(apiVer + "/centers/:centerId/accounts", {centerId:'@centerId'}, {
              getAll: {method: 'GET', params: {}, isArray: true}
          }),
          centerResource: defineResource(apiVer + "/centers/:centerId/:anotherresource", {centerId:'@centerId',anotherresource:'@anotherresource'}, {
            get: {method: 'GET', params: {}},
            update: { method: 'PUT'}
          }),
          centerMeetingResource:defineResource(apiVer + "/centers/:centerId/meetings/:templateSource", {centerId:'@centerId',templateSource:'@templateSource'}, {
            getMeetingInfo: {method:'GET', params: {}}
          }),
          centerTemplateResource: defineResource(apiVer + "/centers/template", {}, {
            get: {method: 'GET', params: {}}
          }),
          jobsResource: defineResource(apiVer + "/jobs/:jobId/:resourceType", {jobId : '@jobId',resourceType : '@resourceType'}, {
            get: {method: 'GET', params: {}, isArray: true},
            getJobDetails: {method: 'GET', params: {}},
            getJobHistory: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}},
          }),
          
          jobsparameters: defineResource(apiVer + "/jobs/:jobId/jopparameters", {jobId : '@jobId'}, {
              get: {method: 'GET', params: {}},
              update: {method: 'PUT', params: {}},
            }),
            
          schedulerResource: defineResource(apiVer + "/scheduler", {}, {
            get: {method: 'GET', params: {}}
          }),
          assignStaffResource:defineResource(apiVer + "/:groupOrCenter/:groupOrCenterId", {groupOrCenter:'@groupOrCenter', groupOrCenterId:'@groupOrCenterId'}, {
            get: {method: 'GET', params: {}}
          }),
          configurationResource:defineResource(apiVer + "/configurations",{}, {
            get: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}}
          }),
          cacheResource:defineResource(apiVer + "/caches",{}, {
            get: {method: 'GET', params: {}, isArray:true},
            update: {method: 'PUT', params: {}}
          }),
          templateResource:defineResource(apiVer + "/templates/:templateId/:resourceType",{templateId: '@templateId', resourceType:'@resourceType'}, {
            get: {method: 'GET', params: {}, isArray:true},
            getTemplateDetails: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}},
          }),
          loanProductTemplateResource: defineResource(apiVer + "/loanproducts/template", {}, {
           get: {method: 'GET', params: {}}
          }),
          loanReassignmentResource: defineResource(apiVer + "/loans/loanreassignment/:templateSource", {templateSource:'@templateSource'}, {
           get: {method: 'GET', params: {}}
          }),
          auditResource: defineResource(apiVer + "/audits/:templateResource", {templateResource:'@templateResource'}, {
            get: {method: 'GET', params: {}},
            search: {method: 'GET', params: {},isArray:true}
          }),
          guarantorResource: defineResource(apiVer + "/loans/:loanId/guarantors/:templateResource", {loanId:'@loanId',templateResource:'@templateResource'}, {
            get: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}}
          }),
          
          contractTemplateResource: defineResource(apiVer + "/subscriptions/template", {}, {
              get: {method: 'GET', params: {}}
            }),
            
          contractResource: defineResource(apiVer + "/subscriptions/:subscriptionId", {subscriptionId:'@SubscriptionId'}, {
              getAllContracts: {method: 'GET', params: {}, isArray: true},
              update: { method: 'PUT' }
          }),
          planResource: defineResource(apiVer + "/plans/:planId", {planId:'@planId'}, {
                getAllPlans: {method: 'GET', params: {}, isArray: true},
                update: { method: 'PUT' }
          }),
          planTemplateResource: defineResource(apiVer + "/plans/template", {}, {
                  get: {method: 'GET', params: {}}
           }),
                
          priceResource: defineResource(apiVer + "/prices/:planId", {planId:'@planId'}, {
                    getAllPrices: {method: 'GET', params: {}, isArray: true},
                    update: { method: 'PUT' }
           }),
           itemResourceTemplate: defineResource(apiVer + "/ownedhardware/template", {}, {
               getAll: {method: 'GET', params: {}}
              }),
           deletePriceResource: defineResource(apiVer + "/prices/:priceId", {priceId:'@priceId'}, {
               getAllPrices: {method: 'GET', params: {}, isArray: true},
               update: { method: 'PUT' }
           }),
           getPriceResource: defineResource(apiVer + "/prices/:priceId/update", {priceId:'@priceId'}, {
               get: {method: 'GET', params: {}},
               update: { method: 'PUT' }
           }),
           
          priceTemplateResource: defineResource(apiVer + "/prices/template", {}, {
                      get: {method: 'GET', params: {planId:'@planId'}}
           }),
           mediaResource: defineResource(apiVer + "/assets/mediadata", {}, {
               getAllMedia: {method: 'GET', params: {}, isArray: true},
            
           }),
           saveMediaResource: defineResource(apiVer + "/assets/:mediaId", {mediaId:'@mediaId'}, {
               getAllMedia: {method: 'GET', params: {}, isArray: true},
                       update: { method: 'PUT' }
           }),
           saveGameMediaResource: defineResource(apiVer + "/assets/mediaIdForGame/:mediaId", {mediaId:'@mediaId'}, {
               get: {method: 'GET', params: {}},
               update: { method: 'PUT' }
           }),
           mediaTemplateResource: defineResource(apiVer + "/assets/template", {}, {
               get: {method: 'GET', params: {}}
           }),
           mediaGameTemplateResource: defineResource(apiVer + "/assets/gamedata/template", {}, {
               get: {method: 'GET', params: {}}
           }),
           mediaGamePartnerResource: defineResource(apiVer + "/assets/gamedata/:type", {}, {
               get: {method: 'GET', params: {}}
           }),
           saveMediaGameTemplateResource: defineResource(apiVer + "/assets/gamedata", {}, {
               get: {method: 'GET', params: {}}
           }),
           updateMediaGameTemplateResource: defineResource(apiVer + "/assets/updateGame/:mediaId", {}, {
               update: {method: 'PUT'}
           }),
          /* itemResource: defineResource(apiVer + "/items/:itemId", {}, {
        	   getAllItems: {method: 'GET', params: {}, isArray: true},
               get: {method: 'GET', params: {}}
           }),*/
           inventoryTemplateResource: defineResource(apiVer + "/items/template", {}, {
               get: {method: 'GET', params: {}}
           }),
           
           importResource: defineResource(apiVer + "/uploadstatus/getData", {}, {
               getAllimportfiles: {method: 'GET', params: {}, isArray: true},
               update: { method: 'PUT' }
           }),
         importProcessResource: defineResource(apiVer + "/uploadstatus/:uploadfileId", {}, {
             update: { method: 'PUT' }
          }),
         
         importviewResource: defineResource(apiVer + "/uploadstatus/:uploadfileId/getdetails", {}, {
        	 get: {method: 'GET', params: {}},
             update: { method: 'PUT' }
          }),
         orderTemplateResource: defineResource(apiVer + "/orders/template", {}, {
           get: {method: 'GET', params: {}}
         }),
         orderResource: defineResource(apiVer + "/orders/:planId/template", {planId:'@planId'}, {
         get: {method: 'GET', params: {}},
        }),
        
        saveOrderResource: defineResource(apiVer + "/orders/:clientId", {clientId:'@clientId'}, {
           get: {method: 'GET', params: {}},
           update: { method: 'PUT' }
          
        }),
        getOrderResource: defineResource(apiVer + "/orders/:clientId/orders", {clientId:'@clientId'}, {
    	  getAllOrders: {method: 'GET', params: {}},
        }),

        getSingleOrderResource: defineResource(apiVer + "/orders/:orderId/orderprice", {orderId:'@orderId'}, {
     	  get: {method: 'GET', params: {}},
     	  update: { method: 'PUT' }
        }),
        OrderDisconnectResource: defineResource(apiVer + "/orders/disconnect", {}, {
       	  get: {method: 'GET', params: {}},
        }),
          
        OrderreconnectResource: defineResource(apiVer + "/orders/reconnect/:orderId", {orderId:'@orderId'},{
           	update: { method: 'PUT' },
            get: {method: 'GET', params: {}},
        }),
        OrderrenewalResourceTemplate: defineResource(apiVer + "/orders/renewalorder/:orderId", {orderId:'@orderId'},{
        	 get: {method: 'GET', params: {}},
        	update: { method: 'PUT' }
        }),
        OrderrenewalResource: defineResource(apiVer + "/orders/renewal/:orderId", {orderId:'@orderId'},{
       	update: { method: 'PUT' }
       }),
       voucherpinResource: defineResource(apiVer + "/randomgenerators/:voucherId", {voucherId:'@voucherId'}, {
           getAllEmployees: {method: 'GET', params: {}, isArray: true}
         }),
         voucherpinTemplateResource: defineResource(apiVer + "/randomgenerators/template", {}, {
             get: {method: 'GET', params: {}}
            }),
         discountResource: defineResource(apiVer + "/discounts/:discountId", {discountId:'@discountId'}, {
             get: {method: 'GET', params: {}, isArray: true},
         	  update: { method: 'PUT' }
            }),
         discountTemplateResource: defineResource(apiVer + "/discounts/template", {}, {
             get: {method: 'GET', params: {}}
            }),
         discountsResource: defineResource(apiVer + "/discounts/:discountId/:resourceType", {discountId:'@discountId', resourceType:'@resourceType'}, {
                get: {method: 'GET', params: {discountId:'@discountId'}},
                getDiscount: {method: 'GET', params: {discountId:'@discountId'}, isArray:true},
                getDiscountDetails: {method: 'GET', params: {discountId:'@discountId'}},
                update: {method: 'PUT', params: {}}
              }),
         prospectResource: defineResource(apiVer + "/prospects/:clientProspectId", {clientProspectId:'@clientProspectId'}, {
               getAllProspects: {method: 'GET', params: {}, isArray: true},
               getDetails: {method: 'GET', params: {clientProspectId:'@clientProspectId'}}
                }),
         prospectEditResource: defineResource(apiVer + "/prospects/edit/:id",{id: '@id'}, {
                    get: {method: 'GET', params: {}},
                    update: {method: 'PUT', params: {}}
                }),
         prospectDeleteResource: defineResource(apiVer + "/prospects/:deleteProspectId", {deleteProspectId:'@deleteProspectId'}, {
               getProspects: {method: 'GET', params: {}, isArray: true},
               update: {method: 'PUT', params: {}}
                }),
         prospectViewResource: defineResource(apiVer + "/prospects/edit/:id", {id:'@id'}, {
              getViewProspects: {method: 'GET', params: {}}
                }),
         prospectHistoryResource: defineResource(apiVer + "/prospects/:prospectdetailid/history", {prospectdetailid:'@prospectdetailid'}, {
              getHistoryProspects: {method: 'GET', params: {}}
                }),       
         prospectTemplateResource: defineResource(apiVer + "/prospects/:clientProspectId/template", {}, {
            getTemplate: {method: 'GET', params: {}},
            update: {method: 'PUT', params: {}}
            }),
         prospectConvertResource: defineResource(apiVer + "/prospects/converttoclient/:deleteProspectId", {deleteProspectId:'@deleteProspectId'}, {
            getViewProspects: {method: 'GET', params: {}}
            }),
         prospectCancelResource: defineResource(apiVer + "/prospects/cancel/:prospectId", {prospectId:'@prospectId'}, {
            getProspects: {method: 'GET', params: {}},
           }),
      
       currencyResource: defineResource(apiVer + "/countrycurrencys/:id/:resourceType", {id:'@id', resourceType:'@resourceType'}, {
            get: {method: 'GET', params: {id:'@id'}},
            getCurrency: {method: 'GET', params: {id:'@id'}, isArray:true},
            getCurrencyDetails: {method: 'GET', params: {id:'@id'}},
            update: {method: 'PUT', params: {}}
           }),
       currencyTemplateResource: defineResource(apiVer + "/countrycurrencys/template", {}, {
           get: {method: 'GET', params: {}}
           }),
           
       adjustmentTemplateResource: defineResource(apiVer + "/adjustments/template", {}, {
           get: {method: 'GET', params: {}}
           }),
           
       adjustmentResource: defineResource(apiVer + "/adjustments/:clientId", {clientId:'@clientId'}, {
          get: {method: 'GET', params: {}}
          }),
       paymentsTemplateResource: defineResource(apiVer + "/payments/template", {}, {
         getPayments: {method: 'GET', params: {}}
          }),
       paymentsResource: defineResource(apiVer + "/payments/:clientId", {clientId:'@clientId'}, {
          get: {method: 'GET', params: {}}
          }),
       transactionHistoryResource: defineResource(apiVer + "/transactionhistory/template/:clientId", {clientId:'@clientId'}, {
       	getTransactionHistory: {method: 'GET', params: {clientId:'@clientId'}, }
          }),
          serviceResource: defineResource(apiVer + "/servicemasters/:serviceId", {serviceId:"@serviceId"}, {
        	  getAllServices: {method: 'GET', params: {}, isArray: true},
        	  update: {method: 'PUT'}
            }),
            serviceTemplateResource: defineResource(apiVer + "/servicemasters/template", {}, {
               get: {method: 'GET', params: {}}
              }),
              assignedTicketsResource: defineResource(apiVer + "/tickets/assignedTickets", {}, {
            	  get: {method: 'GET', params: {}, isArray: true},
            	  update: {method: 'PUT'}
                }),
                getAllTicketResource: defineResource(apiVer + "/tickets/alltickets",{},  {
                	getAllDetails: {method: 'GET', params: {}},
                	get: {method: 'GET', params: {}}
                }),
                getAllProspectResource: defineResource(apiVer + "/prospects/allprospects",{},  {
                	getAllDetails: {method: 'GET', params: {}},
                	get: {method: 'GET', params: {}}
                }),
                statementResource: defineResource(apiVer + "/billmaster/:clientId", {clientId:'@clientId'}, {
                    get: {method: 'GET', params: {}, isArray: true},
                    update: { method: 'PUT'}
                }),
            clientInvoiceResource: defineResource(apiVer + "/billingorder/:clientId", {clientId:'@clientId'}, {
                    get: {method: 'GET', params: {}},
                    update: { method: 'PUT'}
                }),
                messageTemplateResource: defineResource(apiVer + "/messages/template",{},  {
              	  getTemplate: {method: 'GET', params: {}}
                }),
                messageSaveResource: defineResource(apiVer + "/messages/:messageId",{messageId:'@messageId'},  {
              	  get: {method: 'GET', params: {}},
              	  update: {method: 'PUT'}
                }),
                messageResource: defineResource(apiVer + "/messages/data",{},  {
              	  getAllMessages: {method: 'GET', params: {}, isArray:true}
                }),
                eventResource: defineResource(apiVer + "/eventmaster",{},  {
              	  get: {method: 'GET', params: {}, isArray:true }
                }),
                eventEditResource: defineResource(apiVer + "/eventmaster/:eventId",{eventId:'@eventId'},  {
              	  get: {method: 'GET', params: {} },
              	  update: {method: 'PUT'}
                }),
                eventTemplateResource: defineResource(apiVer + "/eventmaster/template",{},  {
              	  get: {method: 'GET', params: {}}
                }),    
                eventPriceTemplateResource: defineResource(apiVer + "/eventprice/template/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
              	  get: {method: 'GET', params: {eventId:'@eventId'}, isArray:true},
              	  getpriceDetails: {method: 'GET', params: {eventId:'@eventId'}}
                }),
                eventPriceGameTemplateResource: defineResource(apiVer + "/eventprice/template/game:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
                	getpriceDetails: {method: 'GET', params: {eventId:'@eventId'}}
                  }),
                eventpriceResource: defineResource(apiVer + "/eventprice/:eventId/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
              	  getprice: {method: 'GET', params: {eventId:'@eventId'}, isArray:true}
                }),
                eventPriceEditResource: defineResource(apiVer + "/eventprice/:id/update",{id:'@id'},  {
              	  geteventpricedetail: {method: 'GET', params: {id:'@id'}},
              	  update: {method: 'PUT', params: {}}
                }),
                regionResource: defineResource(apiVer + "/regions/:regionId/:resourceType", {regionId:'@regionId', resourceType:'@resourceType'}, {
                    get: {method: 'GET', params: {regionId:'@regionId'}},
                    getRegion: {method: 'GET', params: {regionId:'@regionId'}, isArray:true},
                    getRegionDetails: {method: 'GET', params: {regionId:'@regionId'}},
                    update: {method: 'PUT', params: {}}
                  }),
                regionResourceTemplate: defineResource(apiVer + "/regions/template",{},  {
                	  getAllRegions: {method: 'GET', params: {}}     	 
                  }),
                regionResourceGetStates: defineResource(apiVer + "/regions/getstates/:countryId",{countryId:'@countryId'},  {
                  	  get: {method: 'POST', params: {}}     	 
                  }),   
                  ticketResourceTemplate: defineResource(apiVer + "/tickets/template",{},  {
                  	  get: {method: 'GET', params: {}}     	 
                  }),  
                  ticketResource: defineResource(apiVer + "/tickets/:clientId/:id",{clientId:'@clientId', id:'@id'},  {
                	  get: {method: 'GET', params: {}},
                	  getAll: {method: 'GET', params: {}, isArray:true}
                }),
                chargecodeResource: defineResource(apiVer + "/chargecode/:chargeCodeId", {chargeCodeId:'@chargeCodeId'}, {
              	  getAllChargeCode: {method: 'GET', params: {}, isArray: true},
                    update: { method: 'PUT' }
                }),
                chargecodetemplateResource: defineResource(apiVer + "/chargecode/template", {}, {
              	  getAllchargecode: {method: 'GET', params: {}}
                }),
                taxmappingResource: defineResource(apiVer + "/taxmap/:chargeCode/chargeTax", {chargeCode:'@chargeCode'}, {
              	  getAllTaxMapping: {method: 'GET', params: {}, isArray: true},
                    update: { method: 'PUT' }
                }),
                
                getTaxmappingResource: defineResource(apiVer + "/taxmap/:taxId", {taxId:'@taxId'}, {
                	  get: {method: 'GET', params: {}},
                      update: { method: 'PUT' }
                  }),
                
                taxmappingtemplateResource: defineResource(apiVer + "/taxmap/template", {}, {
              	  getAlltaxmapping: {method: 'GET', params: {}}
                }),
                
                supplierResource: defineResource(apiVer + "/suppliers", {}, {
              	  getAlldetails: {method: 'GET', params: {}},
                    get: {method: 'GET', params: {}}
                }),	
                grnResource: defineResource(apiVer + "/itemdetails/grn:itemId/:anotherresource", {itemId:'@itemId',anotherresource:'@anotherresource'},{
             	   getAlldetails: {method: 'GET', params: {}},
                   get: {method: 'GET', params: {}}
               }),
               singleItemDetailResource: defineResource(apiVer + "/itemdetails/singleitem/:itemId", {}, {
                   get: {method: 'GET', params: {}}	
               }),
                 grntemplateResource: defineResource(apiVer + "/itemdetails/addgrn", {}, {
              	   getAlldetails: {method: 'GET', params: {}, isArray: true},
                    get: {method: 'GET', params: {}}
                 }),
                 grnSingleTemplateResource: defineResource(apiVer + "/itemdetails/template", {grnId: '@grnId'}, {
                       get: {method: 'GET', params: {}}	
                 }),
                 grnIdResource: defineResource(apiVer + "/itemdetails/grn/template", {}, {
                     get: {method: 'GET', params: {},isArray: true}	
                 }),
                 
                 itemResource: defineResource(apiVer + "/items/:itemId", {itemId:'@itemId'}, {
                 	   getAllItems: {method: 'GET', params: {}, isArray: true},
                       get: {method: 'GET', params: {}},
                       update: {method: 'PUT', params: {}}
                  }),
                 itemTemplateResource: defineResource(apiVer + "/items/template", {}, {
               	 getAllItems: {method: 'GET', params: {}, isArray: true},
               	 get: {method: 'GET', params: {}}
                 }),
                 itemDetailsResource: defineResource(apiVer + "/itemdetails/:itemId/:anotherresource", {itemId:'@itemId',anotherresource:'@anotherresource'}, {
               	  getAlldetails: {method: 'GET', params: {}},
                     get: {method: 'GET', params: {}}
                 }),	
                 itemResource: defineResource(apiVer + "/items/:itemId", {itemId:'@itemId'}, {
                	   getAllItems: {method: 'GET', params: {}},
                     get: {method: 'GET', params: {}},
                     update: {method: 'PUT', params: {}}
                 }),
                 mrnTemplateResource: defineResource(apiVer + "/mrn/template", {}, {
               	  getAlldetails: {method: 'GET', params: {}, isArray: true},
                     get: {method: 'GET', params: {}}
                 }),
                 mrnResource: defineResource(apiVer + "/mrn/:mrnId", {}, {
               	  getAlldetails: {method: 'GET', params: {}, isArray: true},
                     get: {method: 'GET', params: {}}
                 }),
                 moveMrnResource: defineResource(apiVer + "/mrn/template/ids", {}, {
               	  getAlldetails: {method: 'GET', params: {}, isArray: true},
                     get: {method: 'GET', params: {}}
                 }),
                 moveMrnSaveResource: defineResource(apiVer + "/mrn/movemrn/:mrnId", {}, {
                     get: {method: 'GET', params: {}},
                 	 getMovedMrnResource: {method: 'GET', params: {mrnId:'@mrnId'}}
                 }),
                 viewMrnResource: defineResource(apiVer + "/mrn/view/", {},{
               	  getAlldetails: {method: 'GET', params: {}},
                     get: {method: 'GET', params: {}}
                 }),
                 itemhistoryResource: defineResource(apiVer + "/mrn/history/", {},{
               	  getAlldetails: {method: 'GET', params: {}},
               	  get: {method: 'GET', params: {}}
                 }),
                 FineTransactionResource: defineResource(apiVer + "/financialTransactions/:clientId", {clientId:'@clientId'}, {
                   	getAllFineTransactions: {method: 'GET', params: {}, }
                 }),
                   
                HardwareResource: defineResource(apiVer + "/ownedhardware/:clientId", {clientId:'@clientId'}, {
                 	  getAllOwnHardware: {method: 'GET', params: {}, isArray: true}
                 }),
               
                financialResource: defineResource(apiVer + "/financialTransactions/:transactionId/invoice", {transactionId:'@transactionId'}, {
             	  getAllDetails: {method: 'GET', params: {}}
                }),
               oneTimeSaleResource: defineResource(apiVer + "/onetimesales/:clientId", {clientId:'@clientId'}, {
             	getOneTimeSale: {method: 'GET', params: {clientId:'@clientId'}}
               }),
               eventOrderGameResource: defineResource(apiVer + "/onetimesales/game/:clientId", {clientId:'@clientId'}, {
                	get: {method: 'GET', params: {clientId:'@clientId'}}
               }),
               operatorDeductionResource: defineResource(apiVer+ "/mediasettlements/deductionoperator/:clientId",{clientId: '@clientId'},{
            	   get: {method: 'GET', params: {clientId:'@clientId'}, isArray:true}
               }),
               createOperatorDeductionResource: defineResource(apiVer+ "/mediasettlements/deductionoperator/template",{},{
            	  get: {method: 'GET', params: {}, isArray:true}
               }),
               editOperatorDeductionResource: defineResource(apiVer+ "/mediasettlements/deductionoperator/edit/:id",{id: '@id'},{
             	  get: {method: 'GET', params: {}, isArray:false},
             	  update: {method: 'PUT', params: {}}
                }),
               saveOperatorDeductionData: defineResource(apiVer+ "/mediasettlements/deductionoperator/template",{},{
            	  get: {method: 'GET', params: {}} 
               }),
               deletepartnerAgreementResource: defineResource(apiVer+ "/mediasettlements/agreement/:documentId",{documentId: '@documentId'},{
              	 get: {method: 'GET', params: {}},
              	 update: {method: 'PUT', params: {}}
               }),
               deletePartnerGameDetails: defineResource(apiVer+ "/mediasettlements/partnergame/:gameId",{gameId: '@gameId'},{
              	 get: {method: 'GET', params: {}},
              	 update: {method: 'PUT', params: {}}
               }),
               deleteOneTimeSaleResource: defineResource(apiVer + "/onetimesales/:saleId", {saleId:'@saleId'}, {
                  	update: {method: 'PUT', params: {saleId:'@saleId'}}
               }),
               oneTimeSaleTemplateResource: defineResource(apiVer + "/onetimesales/template", {}, {
                 getOnetimes: {method: 'GET', params: {}}
               }),
               oneTimeSaleTemplateResourceData: defineResource(apiVer + "/onetimesales/:itemId/item", {itemId:'@itemId'}, {
                   get: {method: 'GET', params: {}}
                 }),
               oneTimeSaleQuantityResource: defineResource(apiVer + "/onetimesales/:itemId/totalprice", {itemId:'@itemId'}, {
                get: {method: 'POST', params: {quantity:'@quantity'}}
                 }),
               oneTimeSaleAllocation: defineResource(apiVer + "/onetimesales/:orderId/allocation", {orderId:'@orderId'}, {
                get: {method: 'GET', params: {}}
                 }),
                      
             allocateHardwareDetails: defineResource(apiVer + "/itemdetails/:oneTimeSaleId", {oneTimeSaleId:'@oneTimeSaleId'}, {
                getItemDetails: {method: 'GET', params: {}},
                getSerialNumbers:{method: 'GET', params:{}}
                }),
             allocateHardwareResource: defineResource(apiVer + "/itemdetails/allocation", {}, {
                get: {method: 'GET', params: {}}
                }),
                eventResource: defineResource(apiVer + "/eventmaster",{},  {
              	  get: {method: 'GET', params: {}, isArray:true }
                }),
                eventEditResource: defineResource(apiVer + "/eventmaster/:eventId",{eventId:'@eventId'},  {
              	  get: {method: 'GET', params: {} },
              	  update: {method: 'PUT'}
                }),
                eventTemplateResource: defineResource(apiVer + "/eventmaster/template",{},  {
              	  get: {method: 'GET', params: {}}
                }),
                
                eventOrderTemplateResource: defineResource(apiVer + "/eventorder/:clientId",{clientId:'@clientId'},  {
                	  get: {method: 'GET', params: {clientId:'@clientId'}}
                }),
                
                eventOrderGameTemplateResource: defineResource(apiVer + "/eventorder/game/:clientId",{clientId:'@clientId'},  {
              	  get: {method: 'GET', params: {clientId:'@clientId'}}
                }),
                /*eventOrderPriceTemplateResource: defineResource(apiVer + "/eventorder",{},{
              	  	getEventPrice: {method: 'GET', params: {clientId:'@clientId',ftype:'@ftype',otype:'@otype',eventId:'@eventId'}}
                }),*/
                eventOrderPriceTemplateResource: defineResource(apiVer + "/eventorder",{},{
              	  	getEventPrice: {method: 'GET', params: {clientId:'@clientId',eventId:'@eventId'}}
                }),
                eventOrderPriceUpdateTemplateResource: defineResource(apiVer + "/eventorder",{},{
                	update: {method: 'PUT', params: {}}
                }),
                
                eventPriceTemplateResource: defineResource(apiVer + "/eventprice/template/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
              	  get: {method: 'GET', params: {eventId:'@eventId'}, isArray:true},
              	  getpriceDetails: {method: 'GET', params: {eventId:'@eventId'}}
                }),
                eventpriceResource: defineResource(apiVer + "/eventprice/:eventId/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
              	  getprice: {method: 'GET', params: {eventId:'@eventId'}, isArray:true}
                }),
                eventPriceEditResource: defineResource(apiVer + "/eventprice/:id/update",{id:'@id'},  {
              	  geteventpricedetail: {method: 'GET', params: {id:'@id'}},
              	  update: {method: 'PUT', params: {}}
                }),
                ticketResourceTemplate: defineResource(apiVer + "/tickets/template",{},  {
              	  get: {method: 'GET', params: {}}     	 
              }),  
            ticketResource: defineResource(apiVer + "/tickets/:clientId/:id",{clientId:'@clientId', id:'@id'},  {
            	  get: {method: 'GET', params: {}},
            	  getAll: {method: 'GET', params: {}, isArray:true}
            }),
            editTicketResource: defineResource(apiVer + "/tickets/:clientId/update/:id",{clientId:'@clientId', id:'@id'},  {
            	  get: {method: 'GET', params: {}},
            	  getAll: {method: 'GET', params: {}, isArray:true}
            }),
            closeTicketResource: defineResource(apiVer + "/tickets/:id",{id:'@id'},  {
            	  update: {method: 'PUT', params: {}}
            }),
            ticketHistoryResource: defineResource(apiVer + "/tickets/:id/history",{id:'@id'},  {
          	  get: {method: 'GET', params: {}}
            }),
            AddressTemplateResource: defineResource(apiVer + "/address/template/:city", {city:'@city'}, {
                get: {method: 'GET', params: {}}
              }),
              singleStatementResource: defineResource(apiVer + "/billmaster/:billId/billdetails", {billId:'@billId'}, {
                  get: {method: 'GET', params: {},isArray:true}
                }),
            addressEditResource: defineResource(apiVer + "/address/details/:clientId",{clientId:'@clientId'},  {
            	  get: {method: 'GET', params: {}},
            	  getAll: {method: 'GET', params: {clientId:'@clientId'}}
              }),
           addressResource: defineResource(apiVer + "/address/:clientId",{clientId:'@clientId'},  {
            	update: {method: 'PUT', params: {}}        	 
          }),
          osdResource:  defineResource(apiVer + "/orders/retrackOsdmessage/:id/:orderId",{id:'@id',orderId:'@orderId'},  {
         	 getPost: {method: 'POST', params: {id:'@id',orderId:'@orderId'} }
          }),         
          associationResource: defineResource(apiVer + "/associations/:clientId/:id", {clientId:'@clientId',id:'@id'}, {
              getAssociation: {method: 'GET', params: {}},
              get: {method: 'GET', params: {},isArray: true}             
          }),
          
          deAssociationResource: defineResource(apiVer + "/associations/deassociation/:id", {id:'@id'}, {
        	  update: { method: 'PUT'}
          }),
          
          associationTemplate:  defineResource(apiVer + "/associations/template",{},  {
         	 get: {method: 'GET', params: {}}     	
          }),
          
          associationSaveResource:  defineResource(apiVer + "/associations/:clientId",{clientId:'@clientId'},  {
         	 get: {method: 'GET', params: {}}
          }),
          associationUpdateResource:  defineResource(apiVer + "/associations/:associationId",{associationId:'@associationId'},  {
          	 update: { method: 'PUT'}
           }),       
          mappingResource: defineResource(apiVer + "/servicemapping/:servicemapId", {servicemapId:'@servicemapId'}, {
              get: {method: 'GET', params: {}, isArray: true},
              update: { method: 'PUT'}
          }),
          hardwareMappingResource: defineResource(apiVer + "/hardwaremapping/:hardwaremapId", {hardwaremapId:'@hardwaremapId'}, {
              get: {method: 'GET', params: {}, isArray: true},
              getDetails: {method: 'GET', params: {}},
              update: { method: 'PUT'}
          }) ,   
          
          hardwaretemplateMappingResource: defineResource(apiVer + "/hardwaremapping/template", {}, {
                getTemplateData: {method: 'GET', params: {}}
         }),
         hardwareSwapResource: defineResource(apiVer + "/hardwareswapping/:clientId",{clientId:'@clientId'},  {
       	  get: {method: 'GET', params: {clientId:'@clientId'}}
         }),
        
         serviceMappingResource: defineResource(apiVer + "/servicemapping/:serviceMappingId", {serviceMappingId: '@serviceMappingId'}, {
       	  getAllServiceMapping: {method: 'GET', params: {}, isArray: true},
       	//  get: {method: 'GET', params: {}},
               update: { method: 'PUT' }
           }),
           serviceMappingtemplateResource: defineResource(apiVer + "/servicemapping/template", {}, {
           	  getAllserviceMapping: {method: 'GET', params: {}}
             }),
             mediaSettlementTemplateResource: defineResource(apiVer + "/mediasettlements/partnertype/template",{},{
            	 get: {method: 'GET', params: {}},
            	 getChannelPartnerData: {method: 'GET', params:{partnerType: '@partnerType'}}
             	
             }),
             channelPartnerResource: defineResource(apiVer + "/mediasettlements/partnertype/partnerid",{},{
            	 get: {method: 'GET', params: {}},
            	 getChannelPartnerData: {method: 'GET', params:{partnerType: '@partnerType'}}
             	
             }),
             mediaSettlement: defineResource(apiVer+ "/mediasettlements/:mediaSettlementId",{mediaSettlementId: '@mediaSettlementId'},{
            	 get: {method: 'GET', params: {}},
            	 update: {method: 'PUT'}
             }),
             partnerGame: defineResource(apiVer+ "/mediasettlements/partnergame/template/:mediaSettlementId",{mediaSettlementId: '@mediaSettlementId'},{
            	 get: {method: 'GET', params: {}},
            	 update: {method: 'PUT'},
            	 getCategoryAndPartner: {method: 'GET', params: {}}
             }),
             getCategoryAndPartner: defineResource(apiVer+ "/mediasettlements/partnergame/:prtnerName",{prtnerName: '@prtnerName'},{
            	 get: {method: 'GET', params: {}}
            	 /*update: {method: 'PUT'},
            	 getCategoryAndPartner: {method: 'GET', params: {}}*/
             }),
             partnerGameDetails: defineResource(apiVer+ "/mediasettlements/partnergame/partnergamedetails",{},{
            	 get: {method: 'GET', params: {}, isArray: true}
             }),
             editPartnerGameDetails: defineResource(apiVer+ "/mediasettlements/partnergame/partnergamedetails/:id",{id: '@id'},{
            	 get: {method: 'GET', params: {}},
            	 update: {method: 'PUT', params: {}}
             }),
             revenueSettlement: defineResource(apiVer+ "/mediasettlements/revenuesettlement/template/:categoryId",{},{
            	 get: {method: 'GET', params: {categoryId: '@categoryId'}}
             }),
             submitSettlement: defineResource(apiVer+ "/mediasettlements/revenuesettlement/add",{},{
            	 get: {method: 'GET', params: {}}
             }),
             partnersTemplateResource: defineResource(apiVer + "/mediasettlements/template", {}, {
                getTemplate: {method: 'GET', params: {}},
                update: {method: 'PUT', params: {}}
             }),
             partnerAgreementResource: defineResource(apiVer + "/mediasettlements/partneragreement/:partnerId", {partnerId:'@partnerId'}, {
           	    getAllfiles: {method: 'GET', params: {}, isArray:true},
           	    update: {method: 'PUT', params: {}}
             }),
             editpartnerAgreementResource: defineResource(apiVer+"/mediasettlements/:documentId/attachment", {documentId:'@documentId'}, {
           	    getAllfiles: {method: 'GET', params: {documentId:'@documentId'}},
           	    update: {method: 'PUT', params: {}}
             }),
             getRefreshProcedure: defineResource(apiVer+ "/mediasettlements/procedureCall/:fileId",{fileId:'@fileId'},{
            	get: {method: 'GET', params: {}  }
             }),
             mastersTemplateResource: defineResource(apiVer + "/deductionmaster/template", {}, {
                getTemplate: {method: 'GET', params: {}},
                update: {method: 'PUT', params: {}}
             }),
             payInvoiceTemplateResource: defineResource(apiVer + "/invoice/:invoiceId",{invoiceId: '@invoiceId'},  {
           	    getPayInvoices: { method: 'GET', params: {},isArray: true }  
             }),
             mastersResource: defineResource(apiVer + "/deductionmaster/:id", {id: '@id'}, {
            	getAllmaster: {method: 'GET', params: {}},
                update: { method: 'PUT' }
             }),
             editsettlementSequenceDataDetails: defineResource(apiVer+ "/mediasettlements/settlementSequenceData",{},{
            	get: {method: 'GET', params: {}},
            	update: {method: 'PUT', params: {}}
             }),
             royaltyResource: defineResource(apiVer + "/mediasettlements/client/:clientId", {clientId: '@clientId'}, {
                get: {method: 'GET', params: {}, isArray: true},
                update: { method: 'PUT' }
             }),
             createGameEventResource: defineResource(apiVer +"/mediasettlements/creategameevent/:cId",{cId: '@cId'},{
            	getGameHeaderData: {method: 'GET', params:{},isArray: false},
            	get: {method: 'GET', params:{}}
             }),
             interactivedetailTemplateResource: defineResource(apiVer + "/mediasettlements/interactive/:id",{id: '@id'}, {
                getTemplate: {method: 'GET', params: {}},
                update: { method: 'PUT' }
             }),
             /*interactiveResource: defineResource(apiVer + "/mediasettlements/interactive/:eventId", {eventId: '@eventId'}, {
                get: {method: 'GET', params: {}},
                update: { method: 'PUT' }
             }),*/
             viewInteractiveResource: defineResource(apiVer + "/mediasettlements/viewinteractive/:eventId", {eventId: '@eventId'}, {
                 get: {method: 'GET', params: {}},
                 update: { method: 'PUT' }
              }),
              editInteractiveHeaderResource: defineResource(apiVer + "/mediasettlements/editinteractiveheader/:eventId", {eventId: '@eventId'}, {
                  get: {method: 'GET', params: {}},
                  update: { method: 'PUT' }
               }),
              editInteractiveDetailResource: defineResource(apiVer + "/mediasettlements/editinteractivedetail/:eventId", {eventId: '@eventId'}, {
                   get: {method: 'GET', params: {}},
                   update: { method: 'PUT' }
                }),
             creditDistributionTemplateResource: defineResource(apiVer + "/creditdistributions/template/:clientId",{clientId:'@clientId'},  {
           	    get: { method: 'GET', params: {}}
             }),
             creditDistributionResource: defineResource(apiVer + "/creditdistributions/:clientId",{clientId:'@clientId'}, {
           	    get: { method: 'POST', params: {}}  
             }),
             revenueResourceTemplate: defineResource(apiVer + "/mediasettlements/revenuesettlement/template?rvData=1", {}, {
                get: {method: 'GET', params: {}}
             }),
             revenueResource: defineResource(apiVer + "/mediasettlements/revenue/:clientId", {clientId: '@clientId'}, {
                get: {method: 'GET', params: {}},
                update: {method: 'PUT', params: {}}
             }),
             revenueResourceEdit: defineResource(apiVer + "/mediasettlements/revenueShare/edit/:id", {id:'@id'}, {
              get: {method: 'GET', params: {}}
              }),
             editpartnerAgreementDatasDetails: defineResource(apiVer+ "/mediasettlements/parrtnerAgreementMediaC/:clientId",{clientId : '@clientId'},{
             	 get: {method: 'GET', params: {}},
             	 update: {method: 'PUT', params: {}}
              }),
              getmediaDetailsData: defineResource(apiVer+ "/mediasettlements/parrtnerAgreementMediaC",{agmtId:'@agmtId', mediaCategory:'@mediaCategory' ,partnerType: '@partnerType'},{
             	 get: {method: 'GET', params: {}  }
             	
              }),

             revenueDetails: defineResource(apiVer + "/mediasettlements/revenueShare/:clientId", {clientId: '@clientId'}, {
                get: {method: 'GET', params: {}, isArray: true},
                update: { method: 'PUT' }
             }),
             currencyRateResource: defineResource(apiVer + "/mediasettlements/currency/:id", {id:'@id'}, {
                getAllcurrency: {method: 'GET', params: {}},
                update: { method: 'PUT' }
             }),
             currencyRateTemplateResource: defineResource(apiVer + "/mediasettlements/currency/template", {}, {
                get: {method: 'GET', params: {}},
                update: { method: 'PUT' }
             }),
             businessLineResource: defineResource(apiVer + "/businessline",{},  {
             	get: {method: 'GET', params: {}, isArray:true }
             }),
             businessLineEditResource: defineResource(apiVer + "/businessline/:eventId",{eventId:'@eventId'},  {
           	    get: {method: 'GET', params: {} },
                update: {method: 'PUT'}
             }),
             businessLineTemplateResource: defineResource(apiVer + "/businessline/template",{},  {
                get: {method: 'GET', params: {}}
             }),
             getPartnerType: defineResource(apiVer+ "/mediasettlements/partnerAgreementType/:prtnerName",{prtnerName: '@prtnerName'},{
            	 get: {method: 'GET', params: {}}
             }),
             viewpartnerAgreementResource: defineResource(apiVer+"/mediasettlements/:documentId/attachmentData", {documentId:'@documentId'}, {
            	    getAll: {method: 'GET', params: {}},
            	    update: {method: 'PUT', params: {}}
              }),
             viewpartnerAgreementMediaCategoryResource: defineResource(apiVer+"/mediasettlements/viewpartnerAgreement", {partnerId:'@partnerId'}, {
          	    get: {method: 'GET', params: {} },
          	 }),
          	 pamediaCategoryDataResource: defineResource(apiVer+"/mediasettlements/documentData", {}, {
           	    get: {method: 'GET', params: {}, isArray:true },
           	    update: { method: 'PUT' }
           	 }),
           	deleteMediaCategoryDataResource: defineResource(apiVer+"/mediasettlements/deleteMediaCategory/:detailId", {detailId:'@detailId'}, {
        	    getAll: {method: 'GET', params: {}},
        	    update: {method: 'PUT', params: {}}
            }),
            viewpartnerAccountResource: defineResource(apiVer+"/mediasettlements/:partnerId/partnerAccountView", {partnerId:'@partnerId'}, {
        	    getAll: {method: 'GET', params: {}},
        	    update: {method: 'PUT', params: {}}
            }),
            getActivityMonth: defineResource(apiVer+ "/mediasettlements/activityMonth",{partnertype: '@partnertype',partnerName:'@partnerName',client:'@client',fileId:'@fileId'},{
            	get: {method: 'GET', params: {}, isArray: true }
             }),
            partnerIdenfierTemplateResource: defineResource(apiVer + "/mediasettlements/partners/template", {}, {
                 get: {method: 'GET', params: {}}
             }),
            partnerResource: defineResource(apiVer + "/mediasettlements/partners/:partnerId/:anotherresource", {partnerId:'@partnerId',anotherresource:'@anotherresource'}, {
                   getAllClients: {method: 'GET', params: {}},
                   getClientClosureReasons: {method: 'GET', params: {}},
                   getAllPartnerDocuments: {method: 'GET', params: {}},
                   update: { method: 'PUT'}
             }),
            partnerIdentifierResource: defineResource(apiVer + "/partner_identifiers/:partnerIdentityId/documents", {partnerIdentityId: '@partnerIdentityId'}, {
                   get: {method: 'GET', params: {}, isArray:true}
             }),    
             partnerIdenfierResource: defineResource(apiVer + "/mediasettlements/partners/:partnerId/identifiers/:id", {partnerId:'@partnerId', id: '@id'}, {
               get: {method: 'GET', params: {}}
             }),
             partnerNoteResource: defineResource(apiVer + "/partners/:partnerId/:anotherresource", {partnerId:'@partnerId',anotherresource:'@anotherresource'}, {
                 getAllClients: {method: 'GET', params: {}},
                 getClientClosureReasons: {method: 'GET', params: {}},
                 getAllPartnerDocuments: {method: 'GET', params: {}},
                 update: { method: 'PUT'}
              }),  
              partnerNotesResource: defineResource(apiVer + "/partners/:partnerId/notes", {partnerId:'@partnerId'}, {
                  getAllNotes: {method: 'GET', params: {}, isArray:true}
                }),
            getProPurchaseOrderTemplate: defineResource(apiVer+ "/propurchaseorder/template",{},{
            	get: {method: 'GET', params: {}, isArray: false}
            }),
            getProPurchaseOrderAddressDetails: defineResource(apiVer+ "/propurchaseorder/:purchaseOrderId",{},{
            	get: {method: 'GET', params: {}, isArray: true}
            }),
            getPartnerAddressDetails: defineResource(apiVer+ "/propurchaseorder/partneraddress/:partnerId",{},{
            	get: {method: 'GET', params: {}, isArray: false}
            }),
            getActivityMonthDetails: defineResource(apiVer+ "/propurchaseorder/activitymonth/:perticularsId",{},{
            	get: {method: 'GET', params: {}, isArray: true}
            }),
            getRoyaltyAmountDetails: defineResource(apiVer+ "/propurchaseorder/royaltyamount/",{partnerAddress:'@partnerAddress',perticulars:'@perticulars',month:'@month'},{
            	get: {method: 'GET', params: {}, isArray: false}
            }),
            createProPurchaseOrder: defineResource(apiVer+ "/propurchaseorder/createpropurchaseorder/",{},{
            	post: {method: 'POST', params: {}}
            }),
            editProvisionalPo: defineResource(apiVer+ "/propurchaseorder/editstatus/:provisionaPoId",{},{
            	get: {method: 'GET', params: {}, isArray: false},
            	update: {method: 'PUT'}
            }),
            createPurchaseOrder: defineResource(apiVer+ "/propurchaseorder/purchaseorder/:partnerId",{},{
            	get: {method: 'GET', params: {}, isArray: true},
            	post: {method: 'POST', params: {}}
            }),
            retrivePurchaseOrder: defineResource(apiVer+ "/purchaseorder/:provPoId",{},{
            	get: {method: 'GET', params: {}, isArray: false},
            }),

            retrivePurchaseOrderTrackInvoice: defineResource(apiVer+ "/purchaseorder/trackinvoice/:provPoId",{},{
            	get: {method: 'GET', params: {}, isArray: false},
            	update: {method: 'PUT'}
            }),
            refreshPurchaseOrder: defineResource(apiVer+ "/purchaseorder/refresh/:provPoId",{},{
            	get: {method: 'GET', params: {}, isArray: false},
            }),
            retrivePurchaseOrderId: defineResource(apiVer+ "/purchaseorder",{},{
            	get: {method: 'GET', params: {provPoId:'@provPoId'},isArray:false}
            }),
            savePurchaseOrder: defineResource(apiVer+ "/purchaseorder",{},{
            	get: {method:'GET',params:{},isArray:false}
            }),
            retriveProvisionalPo: defineResource(apiVer+ "/propurchaseorder",{},{
            	get: {method: 'GET', params:{partnerId: '@partnerId'}, isArray:true}
            }),
            getPartnerName: defineResource(apiVer+ "/mediasettlements/partnername",{partnertype: '@partnertype',mediaCategory:'@mediaCategory',client: '@client',fileId:'@fileId'},{
            	get: {method: 'GET', params: {}, isArray: true }
             }),
            getmediaCategoryData: defineResource(apiVer+ "/mediasettlements/mediacategory",{client: '@client',fileId:'@fileId'},{
            	get: {method: 'GET', params: {}, isArray: true }
             }), 
            getmediaCategoriesData: defineResource(apiVer+ "/mediasettlements/mediacategories/:fileId",{fileId:'@fileId'},{
            	get: {method: 'GET', params: {}, isArray: true }
             }), 
             getActivityMonth: defineResource(apiVer+ "/mediasettlements/activityMonth",{mediaCategory:'@mediaCategory',partnertype: '@partnertype',partnerName:'@partnerName',client:'@client',fileId:'@fileId'},{
             	get: {method: 'GET', params: {}, isArray: true }
              }),
	        getActivityMonths: defineResource(apiVer+ "/mediasettlements/activityMonths",{mediaCategory:'@mediaCategory',partnertype: '@partnertype',partnerName:'@partnerName'},{
            	get: {method: 'GET', params: {}, isArray: true }
            }),
            getActivityMonthWithFileId: defineResource(apiVer+ "/mediasettlements/activeMonth/",{client:'@client',fileId: '@fileId'},{
              	get: {method: 'GET', params: {}, isArray: true }
              }),
            getDisbursementsData: defineResource(apiVer+ "/mediasettlements/disbursements",{month:'@month', partnerName:'@partnerName' ,partnertypeId: '@partnertypeId',mediaCategory:'mediaCategory',
                                                                                  client:'@client',fileId:'@fileId'},{
                    get: {method: 'GET', params: {}  }
              }), 
	        getDisbursementsDatas: defineResource(apiVer+ "/mediasettlements/disbursementsData",{month:'@month', partnerName:'@partnerName' ,partnertypeId: '@partnertypeId',
	        	                                                                   mediaCategory:'mediaCategory',fileId:'@fileId'},{
	         	get: {method: 'GET', params: {}  }
	        }),
            getDisbursements: defineResource(apiVer+ "/mediasettlements/disbursementsdatas",{month:'@month',client:'@client',fileId: '@fileId'},{
             	get: {method: 'GET', params: {}  }
              }),
            getDisbursementsPartners: defineResource(apiVer+ "/mediasettlements/partnerdisbursements",{month:'@month',client:'@client',fileId: '@fileId',partnertypeId: '@partnertypeId',partnerName:'@partnerName'},{
                    	get: {method: 'GET', params: {}  }
              }),
            deleteOperatorDeductionResource: defineResource(apiVer+ "/mediasettlements/deductionoperator/:codeId",{codeId:'@codeId'},{
            	  get: {method: 'GET', params: {}},
                  update: { method: 'PUT' }
             }),
              
        };
      }];
    }
  });
  mifosX.ng.services.config(function($provide) {
    $provide.provider('ResourceFactory', mifosX.services.ResourceFactoryProvider);
  }).run(function($log) { $log.info("ResourceFactory initialized"); });
}(mifosX.services || {}));
