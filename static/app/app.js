var app = angular.module('app', ['ngRoute']);
// configure our routes
app.config(function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : '/assets/app/home/home.html',
            controller  : 'homeCtrl'
        })
        .when('/product/:productId', {
            templateUrl : '/assets/app/vproduct/view.html',
            controller  : 'viewCtrl'
        });
});
app.run(function($rootScope,$http,$q){
	var get = $http({method: 'GET', url: '/read', cache: 'true'});
	$q.all([get]).then(function(data){
		$rootScope.products=data[0].data;
	});
})
