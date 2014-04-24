(function(module) {
    mifosX.filters = _.extend(module, {
        DateFormat: function (dateFilter,webStorage) {
            return function(input) {
                if(input){
                	var dateFormater=webStorage.get("dateFormater");
                    var tDate = new Date(input);
                    return dateFilter(tDate,dateFormater);
                }

            }
        }
    });
    mifosX.ng.application.filter('DateFormat', ['dateFilter','webStorage',mifosX.filters.DateFormat]).run(function($log) {
        $log.info("DateFormat filter initialized");
    });
}(mifosX.filters || {}));
