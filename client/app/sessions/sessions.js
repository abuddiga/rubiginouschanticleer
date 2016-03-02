angular.module( 'dinnerDaddy.sessions', [] )

.controller( 'SessionsController', function( $scope, $cookies, Session, Auth, Socket ) {
  $scope.sessions = [];
  $scope.username = $cookies.get('name');

  $scope.sessionName = '';

  $scope.fetchSessions = function() {
    Session.fetchSessions().then( function( sessions ) {
      $scope.sessions = sessions;
    } );
  }

  $scope.fetchSessions();
  //this function listens to a event emitted by server.js-'new session' and recieves and appends the new session
  Socket.on( 'newSession', function( data ) {
    $scope.sessions.push( data );
  });

  // TODO: Create functions to make buttons work
  $scope.setSession = Session.setSession;
  $scope.createSession = function() {
    Session.createSession( $scope.sessionName, $scope.emitCreate );
    $scope.joinSession( $scope.sessionName );
  };
  $scope.joinSession = function( sessionName ) { // sessionName is from a given session in the view, or from creation
    Session.setSession( sessionName );
    Session.joinSession( sessionName, $scope.username, $scope.emitJoin );
  };

  $scope.emitCreate = function( sessionName ) {
    //this function emits a create event to the socket.
    Socket.emit( 'session', {sessionName : sessionName} );
  };
  $scope.emitJoin = function( username, sessionName ) {
    //this function emits a new join event to the socket.
    Socket.emit( 'newJoin', {username: username, sessionName: sessionName} );
  };

} );
