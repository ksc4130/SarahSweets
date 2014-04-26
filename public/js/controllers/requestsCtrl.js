(function(){
	'use strict';
	angular.module('cookies').controller('requestsCtrl', ['$scope', '$location', 'cookieRequestsSrv', function ($scope,$location,cookiesSrv) {
		cookiesSrv.getCookieRequests(function (requests) {
			$scope.cookieRequests = requests;
		});

		$scope.showDetails = function(request) {
			$location.path($location.path() + '/' + request._id);
		};
	}]);
}());