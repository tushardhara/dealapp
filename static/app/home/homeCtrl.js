app.controller('homeCtrl', ['$scope','moduleFactory','$rootScope', function($scope,moduleFactory,$rootScope){
	//$scope.data = moduleFactory.getdata;
	$scope.products = $rootScope.products;
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
			var maxID = _.max($scope.products, function(product){ return product.id; }).id + 1;
			$scope.products.push({
				'id': maxID,
				'name': $scope.product.name,
				'url': $scope.product.url,
				'type': $scope.product.type,
				'links': $scope.product.links
			});
			
			var newproduct=_.findWhere($rootScope.products, {id: maxID});
			moduleFactory.createdata(newproduct)
            .then(
                function (data) {
                    $('#createProduct').modal('hide');
                },
                function (data) {
                    alert(data);    // $scope.data.notes = data;
                });
		}
	// var fetchdata = function () {
 //        moduleFactory.getdata()
 //            .then(
 //                function (data) {
 //                    $scope.products=data;
 //                    $rootScope.products = data;
 //                    //console.log(arr);
 //                },
 //                function (data) {
 //                    alert(data);    // $scope.data.notes = data;
 //                });
 //    };
 //    fetchdata();
}]);