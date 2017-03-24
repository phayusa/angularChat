app.controller('chanCtrl', function($scope, chanFactory, messageFactory){

  $scope.getAllChannels = function(){
    $scope.channels = [];
    var promise = chanFactory.getAllChannel();
    promise.then(function(response) {
      console.log('depuis mon ctrl', response);
      $scope.channels = response.data;
      $scope.loading = false;
    }, function(reason) {
      console.log(reason);
    });
  };

  $scope.connectChannel = function(roomName,roomId){
    // socket.emit("leave room",$scope.currentRoom);
    $scope.leaveRoom(roomName);
    socket.emit('enter room', roomName);
    $scope.currentRoom = roomName;
    $scope.currentId = roomId;
    var promise = messageFactory.getAllMessageFromChannel(roomId);
    promise.then(function(response) {
      // console.log('depuis mon ctrl', response)
      var response = response.data;
      $scope.messages = [];
      response.forEach(function(value,index){
        $scope.messages.push(value["text"])
      })

    }, function(reason) {
      console.log(reason);
    });

  }

  $scope.sendMessage = function(message){
      socket.emit("send message",message,$scope.currentId);
  }

  $scope.leaveRoom = function(roomName){
    socket.emit('leave room',roomName);
  };

  $scope.messages = [];
  $scope.getAllChannels();
  $scope.currentRoom = "";
  $scope.currentId = "";
  $scope.buttonForm = [{idName:"message",model:"test"}]
  var socket = io('http://localhost:3000');

  socket.on('receive message', function(data) {
   console.log('Incoming message:', data);
  //  $scope.messages.push(data);
   $scope.messages.push(data);
   console.log($scope.messages);
  });

  socket.on('connect', function() {
    // Connected, let's sign-up for to receive messages for this room
    console.log("connecter");
  });

});
