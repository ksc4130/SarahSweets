var contactFormCtrl = function ($scope, $http, $location) {
	$scope.formData = {};

	$scope.processForm = function(){
		$http.post('/postContact', $scope.formData).success(function(res){
			console.log(res);
            $location.path('/');
		});
	};
};