app.controller('chanCtrl', function($scope, chanFactory){

  $scope.getAllChannels = function(){
    $scope.channels = [{name:'General'}, {name:'Private'}];
    console.log($scope.channels);
    // var promise = chanFactory.getAllChannel();
    // promise.then(function(response) {
    //   console.log('depuis mon ctrl', response)
    //   $scope.channels = response.data;
    //   $scope.loading = false;
    // }, function(reason) {
    //   console.log(reason);
    // });

  }

  $scope.connectChannel = function(roomName){
    // $scope.socket.leave($scope.currentRoom);
    // $scope.socket.join(roomName);
    console.log(roomName);
    $scope.currentRoom = roomName;

    // $scope.socket.to($scope.currentRoom).emit('connection');
  }

  $scope.sendMessage = function(message, room){
    console.log(message);
    console.log(room);

    // $scope.socket.to($scope.currentRoom).emit(message);
  }

  $scope.getAllChannels();
  $scope.socket = io('http://localhost:3000');
  $scope.currentRoom = "";

});
