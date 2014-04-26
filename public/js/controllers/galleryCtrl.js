(function(){
	'use strict';
	angular.module('cookies').controller('galleryCtrl', ['$scope','cookieRequestsSrv', function ($scope, cookieRequestsSrv) {
		$scope.cookieImages = [];
		cookieRequestsSrv.getCookieImages(function (imageFiles) {
			imageFiles.forEach(function(file){
				$scope.cookieImages.push(file);
			});
		});
	}]);
})();