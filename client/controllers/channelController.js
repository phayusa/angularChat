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

  $scope.connectChannel = function(roomName){
    // socket.emit("leave room",$scope.currentRoom);
    console.log($scope.channels.find({"name":roomName})["_id"]);
    $scope.leaveRoom(roomName);
    socket.emit('enter room', roomName);
    $scope.currentRoom = roomName;
    var id = $scope.channels.find({"name":roomName})["_id"];
    $scope.message = messageFactory.getAllMessageFromChannel(id);
  };

  $scope.sendMessage = function(message){
      console.log(message);
      socket.emit("send message","j'ai envoyé bis");
  };

  $scope.leaveRoom = function(roomName){
    socket.emit('leave room',roomName);
  };

  $scope.messages = [];
  $scope.getAllChannels();
  $scope.currentRoom = "";
  $scope.buttonForm = [{idName:"message",model:"test"}]
  var socket = io('http://localhost:3000');

  socket.on('receive message', function(data) {
   console.log('Incoming message:', data);
   $scope.messages.push(data);
   console.log($scope.messages);
  });

  socket.on('connect', function() {
    // Connected, let's sign-up for to receive messages for this room
    console.log("connecter");
  });

});
