var app = angular.module('app', ['ngRoute','firebase']);
// configure our routes
app.config(function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : '/assets/app/login/login.html',
            controller  : 'loginCtrl'
        })
        .when('/dashboard', {
            templateUrl : '/assets/app/home/home.html',
            controller  : 'homeCtrl'
        })
        .when('/product/:productId', {
            templateUrl : '/assets/app/vproduct/view.html',
            controller  : 'viewCtrl'
        });
});
