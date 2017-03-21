// componments
// Decorators
// Structural

angular.module('labs', [ ])
.directive('vulInfoCard', function(){
	return {
		restrict : 'E',
		templateUrl :'js/labs/profile.html',
		scope : {
			user : '='
		},
		//replace: true,
		controller : function($scope) {

			//var vmx = this;

			$scope.callMe=function(user){
				console.log('called');
				user.rank = "knight";
			}
			//console.log('called scope', $scope);
		},

	}
})
.directive('brand', function(){
	return {
		restrict : 'E',
		scope : {
			heading : '='
		},
		template : '<div><button>{{heading}}</button></div>',
	}
})
.directive('intTab', [function(){
	return {
        templateUrl: 'js/labs/int-tab.html',
		controller : function() {
			var vm = this;
			vm.select = function(tab) {
				console.log('selected tab=' + tab);
			};
		},
		controllerAs : 'ints'
    };
}]);
