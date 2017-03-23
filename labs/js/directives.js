// componments
// Decorators
// Structural

angular.module('labs', [ ])
.directive('vulInfoCard', function(){
	return {
		restrict : 'E',
		templateUrl :'js/profile.html',
		scope : {
			user : '='
		},
		//replace: true,
		controller : function($scope) {
			$scope.collapsed =false;
			//var vmx = this;

			$scope.callMe=function(user){
				console.log('called');
				user.rank = "knight";
			};

			$scope.collapse=function(){
				console.log('called collapse()');
				$scope.collapsed=(!$scope.collapsed);
			};
			console.log('called scope', $scope);
		},

	}
});
