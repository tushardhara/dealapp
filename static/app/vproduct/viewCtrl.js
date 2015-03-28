app.controller('viewCtrl', ['$scope','$routeParams','$location','moduleFactory',"$firebaseArray",'$rootScope', function($scope,$routeParams,$location,moduleFactory,$firebaseArray,$rootScope){
	if($rootScope.authData){
        var ref = new Firebase("https://deal-27.firebaseio.com/products/" + $routeParams.productId);
        $scope.product = $firebaseArray(ref);
        $scope.options = [
            { label: 'Single', value: 'Single' },
            { label: 'Group', value: 'Group' },
            { label: 'Variable', value: 'Variable' }
          ];
            
        ref.on('value', function(nameSnapshot) {
            $scope.product = nameSnapshot.val();
            $scope.id = nameSnapshot.key();
            $scope.correctlySelected = $scope.options[_.findLastIndex($scope.options, {
                value: $scope.product.type
            })];
        });
        $scope.deletelink = function(variation){
            $scope.product.links.splice(_.findLastIndex($scope.product.links, variation),1);
            ref.set(angular.fromJson(angular.toJson($scope.product)));
        }
        $scope.edit = function(){
            ref.set(angular.fromJson(angular.toJson($scope.product)));
            $('#editProduct').modal('hide');
        }
        $scope.update = function() {
            $scope.product.type = $scope.correctlySelected.value;
        }    
        $scope.addvariation = function(){
            $scope.product.links.push({
                'name':'',
                'href':'',
                'price':''
            });
        }
        $scope.delete = function(){
            ref.onDisconnect().remove();
           $location.path("/dashboard");
        }
    }else{
        $location.path("/");
    }
}])