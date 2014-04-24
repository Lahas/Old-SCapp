
(function(module) {
    mifosX.controllers = _.extend(module, {
        OrderDisconnectController: function(scope,routeParams,resourceFactory, location,dateFilter) {
            scope.disconnectDetails = [];
            scope.start = {};
            scope.start.date = new Date();
            resourceFactory.OrderDisconnectResource.get(function(data) {
                scope.disconnectDetails = data.disconnectDetails;
            });

    scope.submit = function() {
    	this.formData.locale = 'en';
    	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
        this.formData.dateFormat = 'dd MMMM yyyy';
        this.formData.disconnectionDate = reqDate;
        resourceFactory.saveOrderResource.update({'clientId': routeParams.id},this.formData,function(data){
            location.path('/vieworder/'+data.resourceId+'/'+routeParams.id);
        });
    };
        }
    });
    mifosX.ng.application.controller('OrderDisconnectController', ['$scope','$routeParams','ResourceFactory', '$location','dateFilter', mifosX.controllers.OrderDisconnectController]).run(function($log) {
        $log.info("OrderDisconnectController initialized");
    });
}(mifosX.controllers || {}));

