app.controller('loginCtrl', ['$scope','moduleFactory',"$firebaseArray",'$rootScope','$location', function($scope,moduleFactory,$firebaseArray,$rootScope,$location){

	var ref = new Firebase("https://deal-27.firebaseio.com/products/");
	
	$scope.SignIn = function(){
		ref.authWithPassword({
		  email    : $scope.user.email,
		  password : $scope.user.password
		}, function(error, authData) {
		  if (error) {
		    alert("Login Failed! :"+ error.message);
		  } else {
		    $rootScope.authData = authData;
		    $location.path("/dashboard");
		  }
		});
	} 
	
}]);