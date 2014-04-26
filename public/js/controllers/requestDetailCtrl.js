(function(){
	angular.module('cookies').controller('requestDetailCtrl', ['$scope', '$stateParams' ,'cookieRequestsSrv', function($scope, $stateParams, cookieRequestsSrv){

		cookieRequestsSrv.currentRequestById($stateParams.id, function (request) {
			$scope.currentRequest = request;
		});
	}]);
})();