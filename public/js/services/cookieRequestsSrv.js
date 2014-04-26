(function(){
	'use strict';
	angular.module('cookies').factory('cookieRequestsSrv', ['$http', function ($http) {
		var self = {};
		self.getCookieRequests = function(callback) {
			$http.get('/cookieRequests').success(callback);
		};
		self.currentRequestById = function(id, callback) {
			$http.get('/cookieRequests/' + id).success(callback);
		};
		self.getCookieImages = function(callback) {
			$http.get('/cookie-images').success(callback)
		};
		return self;
	}]);
}());