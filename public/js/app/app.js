var cookies = angular.module('cookies', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
  	.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'tmpls/home.html',
				controller: 'homeCtrl'
			})
		 	.state('about', {
		 		url: '/about',
		 		templateUrl: 'tmpls/about.html'
		 	})
		 	.state('contact', {
		 		url : '/contact',
		 		templateUrl: 'tmpls/contact.html'
		 	})
		 	.state('gallery', {
		 		url : '/gallery',
		 		templateUrl: 'tmpls/gallery.html',
		 		controller: 'galleryCtrl'
		 	})
		 	.state('cookies-admin', {
		 		url: '/cookies-admin',
		 		templateUrl: 'tmpls/cookies-admin.html',
		 		controller: 'requestsCtrl'
		 	})
		 	.state('cookies-admin/detail', {
		 		url: '/cookies-admin/:id',
		 		templateUrl: '/tmpls/cookieRequest.html',
		 		controller: 'requestDetailCtrl'
		 	})
		 	.state('login', {
		 		url: '/login',
		 		templateUrl: 'tmpls/login.html',
		 		controller: 'authCtrl'
		 	});

		$locationProvider.html5Mode(true);
	}])
    .run(function($rootScope, $location){
        $rootScope.hideNav = false;
        var once = false;
        $rootScope.$on('$stateChangeStart', function () {
            console.log('change start', $location.path());
            if(!once && $location.path() === '/') {
                $rootScope.hideNav = true;
            } else {
                $rootScope.hideNav = false;
            }
            once = true;


        });
    });

angular.module('cookies').controller('galleryCtrl', function($scope){
	$scope.test = 'Whasssss up?';
});


