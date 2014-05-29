(function(module) {
  mifosX.filters = _.extend(module, {
    StatusLookup: function (dateFilter) {
                    return function(input) {
                    	/*var toDayDate = dateFilter(new Date(),'dd MMMM yyyy');
                    	var currentDate = dateFilter(new Date(input),'dd MMMM yyyy');
                    	
                    		if(new Date(currentDate) >= new Date(toDayDate)){
                        		input ="Active";
                        	}
                    	
                    	if(new Date(currentDate) < new Date(toDayDate)){
                        	input = "clientStatusType.transfer.on.hold";
                    	}*/
                      var  cssClassNameLookup = {
                        "true" : "statusactive" ,
                        "false" : "statusdeleted",
                        "delete" : "statusbad",
                        "Active" : "statusactive",
                        "loanStatusType.submitted.and.pending.approval" : "statuspending",
                        "loanStatusType.approved" : "statusApproved",
                        "loanStatusType.active" : "statusactive",
                        "savingsAccountStatusType.submitted.and.pending.approval":"statuspending",
                        "savingsAccountStatusType.approved":"statusApproved",
                        "savingsAccountStatusType.active":"statusactive",
                        "loanProduct.active":"statusactive",
                        "clientStatusType.pending":"statuspending",
                        "clientStatusType.active":"statusactive",
                        "clientStatusType.submitted.and.pending.approval":"statuspending",
                        "clientStatusTYpe.approved":"statusApproved",
                        "clientStatusType.transfer.in.progress":"statustransferprogress",
                        "clientStatusType.transfer.on.hold":"statustransferonhold",
                        "groupingStatusType.active":"statusactive",
                        "groupingStatusType.pending":"statuspending",
                        "groupingStatusType.submitted.and.pending.approval":"statuspending",
                        "groupingStatusType.approved":"statusApproved"
                     }

                      return cssClassNameLookup[input];
                  }
                }
  });
  mifosX.ng.application.filter('StatusLookup', ['dateFilter',mifosX.filters.StatusLookup]).run(function($log) {
    $log.info("StatusLookup filter initialized");
  });
}(mifosX.filters || {}));
