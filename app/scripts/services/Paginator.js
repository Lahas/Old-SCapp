(function(module) {
  mifosX.services = _.extend(module, {
    PaginatorService: function(scope, httpService,$notification) {
      
      this.paginate = function(fetchFunction, pageSize) {
              var paginator = {
              hasNextVar: false,
              next: function() {
                if (this.hasNextVar) {
                  this.currentOffset += pageSize+1;
                  this._load();
                }
              },
              _load: function() {
                  var self = this;
                  fetchFunction(this.currentOffset, pageSize + 1, function(items) {
                  self.currentPageItems = items.pageItems;
                  self.totalFilteredRecords = items.totalFilteredRecords;
                  if(self.currentPageItems.length<=0){
                	  $notification.warning("Empty Result set", "Records not found", "");
                  }
                  self.hasNextVar = (items.pageItems.length === pageSize + 1)&&
                       (!(self.currentOffset == self.totalFilteredRecords-(pageSize + 1)));
              });
              },
              hasNext: function() {
              return this.hasNextVar;
              },
              previous: function() {
              if(this.hasPrevious()) {
              this.currentOffset -= pageSize+1;
              this._load();
              }
              },
              hasPrevious: function() {
              return this.currentOffset !== 0;
              },
              currentPageItems: [],
              currentOffset: 0,
              };
              // Load the first page
              paginator._load();
              return paginator;
        };

    }
  });
  mifosX.ng.services.service('PaginatorService', ['$rootScope', 'HttpService','$notification', mifosX.services.PaginatorService]).run(function($log) {
    $log.info("PaginatorService initialized");
  });
}(mifosX.services || {}));
