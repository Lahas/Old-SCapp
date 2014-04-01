(function(module) {
  mifosX.controllers = _.extend(module, {
    EditClientController: function(scope,webStorage, routeParams, resourceFactory, location, http,dateFilter) {
        scope.offices = [];
        scope.date = {};
        
        scope.clientId = routeParams.id;
        var clientData = webStorage.get('clientData');
        scope.displayName=clientData.displayName;
        scope.statusActive=clientData.statusActive;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        
        resourceFactory.clientResource.get({clientId: routeParams.id, template: 'true'} , function(data) {
            scope.offices = data.officeOptions;
            scope.staffs = data.staffOptions; 
            scope.officeId = data.officeId;
            scope.circleDatas = data.circleData;
		    scope.clientCategory=data.categoryType;
		    scope.clientCategoryDatas=data.clientCategoryDatas;
            scope.formData = {
              firstname : data.firstname,
              lastname : data.lastname,
              middlename : data.middlename,
              active : data.active,
              externalId: data.externalId,
              accountNo : data.accountNo, 
              staffId : data.staffId,
              email:data.email,
              phone:data.phone,
              licenseFree:data.licenseFree,
              royaltyValue:data.royaltyValue
            };
            var actDate = dateFilter(data.activationDate,'dd MMMM yyyy');
            scope.date.activationDate = new Date(actDate);
            if(data.active){
                scope.choice = 1;
            }

        });

        scope.onFileSelect = function($files) {
          scope.file = $files[0];
        };
        
        scope.submit = function() {
             this.formData.locale = 'en';
             this.formData.dateFormat = 'dd MMMM yyyy';
             if(scope.date.activationDate){this.formData.activationDate = dateFilter(scope.date.activationDate,'dd MMMM yyyy');}
             resourceFactory.clientResource.update({'clientId': routeParams.id},this.formData,function(data){
              if (scope.file) {
                http.uploadFile({
                  url: 'https://localhost:9554/obsplatform/api/v1/clients/'+data.clientId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                  // to fix IE not refreshing the model
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  location.path('/viewclient/'+data.resourceId);
                });
              } else{
                location.path('/viewclient/' + data.resourceId);
              }
          });
        };
    }
  });
  mifosX.ng.application.controller('EditClientController', ['$scope','webStorage', '$routeParams', 'ResourceFactory', '$location', '$http','dateFilter', mifosX.controllers.EditClientController]).run(function($log) {
    $log.info("EditClientController initialized");
  });
}(mifosX.controllers || {}));
