angular.module( 'moviematch.auth', [] )

.controller( 'AuthController', function($scope, Auth, $window, $location, $timeout) {
  $scope.user = {};

  if ($location.path() === '/signout') {
    console.log( 'You are signed out. Redirecting in 2s.' );
    Auth.signout();
    $timeout( function() {
      $location.path( '/signin' );
    }, 2000 );
  }


  $scope.signout = function () {
    Auth.signout()
    .then(function() {
      // TODO: redirect
    })
    .catch(function(err) {
      console.error(err);
    });
  };

})

.factory( 'Auth', function($http, $location, $window) {
  var isAuth = function() {
    // TODO: check for user cookies
  };

  var signout = function() {
    // TODO: remove cookies
  };
  return {
    isAuth: isAuth,
    signout: signout
  };
});
