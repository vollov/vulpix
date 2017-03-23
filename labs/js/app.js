'use strict';

angular.module('siteApp', ['ui.router', 'labs'])
.config(['$stateProvider','$locationProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('home', {
		url : '/home',
		templateUrl : 'views/home.html'
	});

	$locationProvider.hashPrefix('');
	$urlRouterProvider.otherwise('home');
}])
.controller('mainCtrl',['$scope',function($scope){

	$scope.user1 = {
		name: 'dustin',
		address:{
			city: 'toronto',
		},
		friends:['Ann','Leah','Mary']
	};

	$scope.user2 = {
		name: 'Lana',
		address:{
			city: 'toronto',
		},
		friends:['Ann','Leah','Mary']
	};

	console.log($scope);
}]);
