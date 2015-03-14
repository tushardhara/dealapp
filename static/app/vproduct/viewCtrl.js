app.controller('viewCtrl', ['$scope','$routeParams','$rootScope','$location','moduleFactory', function($scope,$routeParams,$rootScope,$location,moduleFactory){
	$scope.options = [
    { label: 'Single', value: 'Single' },
    { label: 'Group', value: 'Group' },
    { label: 'Variable', value: 'Variable' }
  ];
	$scope.product = _.findWhere($rootScope.products, {id: $routeParams.productId});
	$scope.correctlySelected = $scope.options[_.findLastIndex($scope.options, {
  		value: $scope.product.type
	})];
	$scope.update = function() {
	    $scope.product.type = $scope.correctlySelected.value;
	}
	$scope.deletelink = function(variation){
		$scope.product.links.splice(_.findLastIndex($scope.product.links, variation),1);
		moduleFactory.editdata($scope.product)
            .then(
                function (data) {
                    //$('#editProduct').modal('hide');
                },
                function (data) {
                    alert(data);    // $scope.data.notes = data;
                });
	}
	$scope.addvariation = function(){
		$scope.product.links.push({
			'name':'',
			'href':'',
			'price':''
		});
	}
	$scope.edit = function(){
		moduleFactory.editdata($scope.product)
            .then(
                function (data) {
                    $('#editProduct').modal('hide');
                },
                function (data) {
                    alert(data);    // $scope.data.notes = data;
                });
	}
	$scope.delete = function(){
		moduleFactory.deletedata($scope.product)
            .then(
                function (data) {
                	$rootScope.products.splice(_.findLastIndex($rootScope.products, $scope.product),1);
                    $location.path('/');
                },
                function (data) {
                    alert(data);    // $scope.data.notes = data;
                });
	}
}])