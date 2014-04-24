(function(module) {
  mifosX.controllers = _.extend(module, {
    AddImportFileController: function(scope, resourceFactory,http,location) {
        scope.subscriptions = [];
        scope.formData={};
        scope.formData.status="-1";
        
        scope.onFileSelect = function($files) {
            scope.file = $files[0];
          };
          
          /*scope.downloadFile = function (value){ 
         	 // alert(value);
       		window.open("Xls/"+value+".xlsx");
           };*/
           
           scope.downloadFile = function (value){
           	if(value == "MediaAssets"|| value == "Advertisement"){
           		window.open("Xls/"+value+".xlsx");
                }else
                {	 
               	 window.open("csv/"+value+".csv");
                }
              	};
          
          scope.submit = function () {
              http.uploadFile({/*41.75.85.206:8080*/
                url: 'https://'+document.location.host+'/obsplatform/api/v1/uploadstatus/documents', 
                data: scope.formData,
                file: scope.file
              }).then(function(data) {
                // to fix IE not refreshing the model
                if (!scope.$$phase) {
                  scope.$apply();
                }
                location.path('/importing');
              });
            };
    }
  });
  mifosX.ng.application.controller('AddImportFileController', ['$scope', 'ResourceFactory', '$http', '$location', mifosX.controllers.AddImportFileController]).run(function($log) {
    $log.info("AddImportFileController initialized");
  });
}(mifosX.controllers || {}));
