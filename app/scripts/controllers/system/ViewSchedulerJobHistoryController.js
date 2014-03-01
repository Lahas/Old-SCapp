
(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewSchedulerJobHistoryController: function(scope, resourceFactory , paginatorService, routeParams) {
        scope.jobhistory = [];
        var fetchFunction = function(offset, limit, callback) {
          resourceFactory.jobsResource.getJobHistory({jobId : routeParams.id, resourceType : 'runhistory', offset: offset, limit: limit} , callback);
        };
        scope.logFile = function (path){ 
	         window.open('https://localhost:8443/obsplatform/api/v1/jobs/printlog?tenantIdentifier=default&path='+path);
	    };
        scope.jobhistory = paginatorService.paginate(fetchFunction, 14);
    }
  });
  mifosX.ng.application.controller('ViewSchedulerJobHistoryController', ['$scope', 'ResourceFactory', 'PaginatorService', '$routeParams', mifosX.controllers.ViewSchedulerJobHistoryController]).run(function($log) {
    $log.info("ViewSchedulerJobHistoryController initialized");
  });
}(mifosX.controllers || {}));

