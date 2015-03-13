var app = angular.module('app', ['ngRoute','datatables']);
// configure our routes
app.config(function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : '/assets/app/home/home.html',
            controller  : 'homeCtrl'
        });
});