app.controller('homeCtrl', ['$scope','moduleFactory', function($scope,moduleFactory){
	//$scope.data = moduleFactory.getdata;
	var fetchdata = function () {
        moduleFactory.getdata()
            .then(
                function (data) {
                    $scope.products=data;
                    //console.log(arr);
                },
                function (data) {
                    alert(data);    // $scope.data.notes = data;
                });
    };
    fetchdata();
}]);