angular.module( 'dinnerDaddy.lobby', [] )

.controller( 'LobbyController', function( $scope, $location, $cookies, Session, Lobby, Socket, Auth ) {
  $scope.session = {};
  $scope.username = $cookies.get('name');
  $scope.users = [];

  Session.getSession()
  .then( function( session ) {

    $scope.session = session;
    
    Lobby.getUsersInOneSession( $scope.session.sessionName )
    .then( function( users ){
      $scope.users = users;
    } );

  });



  //this function is listening to any newUser event and recieves/appends the new user
  Socket.on( 'newUser', function( data ) {
    $scope.users.push( data );
  } );

  $scope.startSession = function( sessionName ) {
    Socket.emit( 'startSession', { sessionName: sessionName } );
  };

  Socket.on( 'sessionStarted', function() {
    $location.path( '/match' );
  } );

} )

.factory( 'Lobby', function( $http ) {
  return {
    getUsersInOneSession: function( sessionName ) {
      return $http.get( '/api/sessions/users/' + sessionName )
      .then( function( res ) {
        return res.data;
      } , 
      function( err ) {
        console.error( err );
      } );
    }
  }
})

.factory( 'FetchMovies', function( $http ) {
  return {

    getMovie: function( id ) {
      return $http.get( '/api/movies/' + id )
      .then( function( res ) {
        return res.data;
      },
      function( err ) {
        console.error( err );
      });
    },

    getNext10Movies: function( packageNumber ) {
      return $http.get( '/api/movies/package/' + packageNumber )
      .then( function( res ) {
        return res.data;
      },
      function( err ) {
        console.error( err );
      } );
    }

  }
} )
