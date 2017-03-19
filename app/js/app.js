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
	}];

	vm.activate = function (path){
		var currentState = $state.current.name || 'home';
		console.log('PageCtrl.activate() get page name=' + currentState);
		return (currentState === path) ? 'active' : 'menu';
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

				//console.log('selected tab=%j', selectedTab.heading);
				angular.forEach(self.tabs, function(tab) {
					// console.log('for tab=%j', tab.heading);

					if (tab.active && tab !== selectedTab) {
						console.log('other tab=%j', tab.heading);
						tab.active = false;
					}
				});
				selectedTab.active = true;
			};
		}
	}; // return end
}]);
