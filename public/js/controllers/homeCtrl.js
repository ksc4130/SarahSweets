(function(){
	'use strict';
	angular.module('cookies').controller('homeCtrl', ['$scope', '$animate', function($scope, $animate, $rootScope){
		$scope.togglePhoto = function() {
			$scope.photo = !$scope.photo;
		};
		$scope.toggleAbout = function(){
			$scope.about = !$scope.about;
		}
		$scope.toggleContact = function(){
			$scope.contact = !$scope.contact;
		}
	}]);
}());