angular.module( 'dinnerDaddy.auth', [] )

.controller( 'AuthController', function($scope, $rootScope, Auth, $window, $location, $timeout) {
  $scope.user = {};

  if ($location.path() === '/signout') {
    console.log('You are signed out. Redirecting in 2s.');
    Auth.signout();
    $timeout( function() {
      $location.path('/signin');
    }, 2000 );
  }


  $scope.signout = function () {
    Auth.signout();
    // might have to reload page as well, not sure yet
    $location.path('/signin');
  };

})

.factory( 'Auth', function($http, $cookies, $location, $window) {
  var isAuth = function() {
    return ($cookies.get('fbId') !== undefined);
  };

  var signout = function() {
    //clear cookies
    $cookies.remove("name");
    $cookies.remove("picture");
    $cookies.remove("fbId");
  };

  return {
    isAuth: isAuth,
    signout: signout
  };
});
