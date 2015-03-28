app.controller('homeCtrl', ['$scope','moduleFactory',"$firebaseArray",'$rootScope','$location', function($scope,moduleFactory,$firebaseArray,$rootScope,$location){
	if($rootScope.authData){
		var ref = new Firebase("https://deal-27.firebaseio.com/products/");
		$scope.products = $firebaseArray(ref);	
		$scope.options = [
		    { label: 'Single', value: 'Single' },
		    { label: 'Group', value: 'Group' },
		    { label: 'Variable', value: 'Variable' }
		  ];
		  $scope.correctlySelected = $scope.options[0];
		  $scope.product = {};
		  $scope.product.type = $scope.correctlySelected.value;
		  $scope.product.links = [];
		  
		  $scope.deletelink = function(variation){
			$scope.product.links.splice(_.findLastIndex($scope.product.links, variation),1);
		  }
		  $scope.addvariation = function(){
				$scope.product.links.push({
					'name':'',
					'href':'',
					'price':''
				});
			}
			$scope.update = function() {
			    $scope.product.type = $scope.correctlySelected.value;
			}
			$scope.create = function(){
				$scope.products.$add({
					'name': $scope.product.name,
					'url': $scope.product.url,
					'type': $scope.product.type,
					'links': $scope.product.links
				});
				$('#createProduct').modal('hide');
			}
	}else{
		$location.path("/");
	}
	

}]);