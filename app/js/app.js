'use strict';

angular.module('siteApp', ['ui.router', ])
.config(['$stateProvider','$locationProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
	$stateProvider.state('home', {
		url : '/home',
		templateUrl : 'views/home.html'
	})
	.state('plumbing', {
		url : '/plumbing',
		templateUrl : 'views/plumbing.html'
	}).state('water-heaters', {
		url : '/water-heaters',
		templateUrl : 'views/water-heaters.html'
	}).state('heating-cooling', {
		url : '/heating-cooling',
		templateUrl : 'views/heating-cooling.html'
	}).state('renovation', {
		url : '/renovation',
		templateUrl : 'views/renovation.html'
	}).state('contact-us', {
		url : '/contact-us',
		templateUrl : 'views/contact-us.html'
	}).state('chinese', {
		url : '/chinese',
		templateUrl : 'views/chinese.html'
	});
	$locationProvider.hashPrefix('');
	$urlRouterProvider.otherwise('home');
}])
.controller('MenuCtrl', ['$state','$stateParams',function($state, $stateParams){
	var vm = this;

	vm.menuItems = [{
		state:'home',
		text: 'Home',
	},{
		state:'plumbing',
		text: 'Plumbing',
	},{
		state:'water-heaters',
		text: 'Water Heaters',
	},{
		state:'heating-cooling',
		text: 'Heating & Cooling',
	},{
		state:'renovation',
		text: 'Renovation',
	},{
		state:'contact-us',
		text: 'Contact Us',
	},{
		state:'chinese',
		text: '中文',
	}];


	vm.activate = function (path){
		var currentState = $state.current.name || 'home';

		console.log('PageCtrl.activate() get page name=' + currentState);
		//vm.state = currentState;
		return (currentState === path) ? 'current-menu-item' : '';
	}
}])

.directive('tabset', [function() {
	return {
		restrict : 'E',
		transclude : true,
		scope : {},
		templateUrl : 'views/tabset.html',
		bindToController : true,
		controllerAs : 'tabset',
		controller : function() {
			var self = this;
			self.tabs = [];

			self.addTab = function addTab(tab) {
				self.tabs.push(tab);
				if (self.tabs.length === 1) {
					tab.active = true;
				}
			};

			self.select = function(selectedTab) {
				if (selectedTab.disabled) {
					return;
				}

				console.log('selected tab=%j', selectedTab.heading);
				angular.forEach(self.tabs, function(tab) {
					console.log('for tab=%j', tab.heading);

					if (tab.active && tab !== selectedTab) {
						console.log('other tab=%j', tab.heading);
						tab.active = false;
					}
				});
				selectedTab.active = true;
			};
		}
	}
}])
.directive('tab', [function(){
	return {
		restrict : 'E',
		transclude : true,
		template : '<div role="tabpanel" ng-show="active" ng-transclude></div>',
		require : '^tabset',
		scope : {
			heading : '@'
		},
		link : function(scope, elem, attr, tabsetCtrl) {
			scope.active = false;

			tabsetCtrl.addTab(scope);
		}
	}
}]);
