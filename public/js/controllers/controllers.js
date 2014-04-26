(function(){
	'use strict';
	angular.module('cookies').controller('requestsCtrl', ['$scope', '$location', 'cookieRequestsSrv', function ($scope,$location,cookiesSrv) {
		cookiesSrv.getCookieRequests(function (requests) {
			$scope.cookieRequests = requests;
			console.log(requests);
		});

		$scope.showDetails = function(request) {
			$location.path($location.path() + '/' + request._id);
		};
	}]).controller('homeCtrl', ['$scope', '$animate', function($scope, $animate){
		$scope.togglePhoto = function() {
			$scope.photo = !$scope.photo;
		};
		$scope.toggleAbout = function(){
			$scope.about = !$scope.about;
		}
		$scope.toggleContact = function(){
			$scope.contact = !$scope.contact;
		}
	}]).controller('requestDetailCtrl', ['$scope', '$stateParams' ,'cookieRequestsSrv', function($scope, $stateParams, cookieRequestsSrv){

		cookieRequestsSrv.currentRequestById($stateParams.id, function (request) {
			$scope.currentRequest = request;
		});
	}]).controller('requestsCtrl', ['$scope', '$location', 'cookieRequestsSrv', function ($scope,$location,cookiesSrv) {
		cookiesSrv.getCookieRequests(function (requests) {
			$scope.cookieRequests = requests;
			console.log(requests);
		});

		$scope.showDetails = function(request) {
			$location.path($location.path() + '/' + request._id);
		};
	}]).controller('contactFormCtrl', ['$scope', '$http', function ($scope,$http) {
		$scope.formData = {};

		$scope.processForm = function(){
			$http.post('/postContact', $scope.formData).success(function(res){
			console.log(res);
		});

	}]).controller('DatepickerCtrl', ['$scope', function ($scope) {
		$scope.today = function() {
    			$scope.dt = new Date();
		};
		$scope.today();

		$scope.showWeeks = true;

		$scope.clear = function () {
			$scope.dt = null;
		};

		// Disable weekend selection
		// $scope.disabled = function(date, mode) {
		//   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		// };

		$scope.toggleMin = function() {
			var minDate = $scope.dt.getMonth() + '/' + $scope.dt.getDate() + '/' + $scope.dt.getYear();
			$scope.minDate = minDate;
		};

		$scope.toggleMin();

		$scope.open = function($event) {
			$event.preventDefault();
			$event.stopPropagation();

			$scope.opened = true;
		};

		$scope.dateOptions = {
			'year-format': "'yy'",
			'starting-day': 1
		};

		$scope.formats = ['shortDate'];
		$scope.format = $scope.formats[0];

	}]);
}());