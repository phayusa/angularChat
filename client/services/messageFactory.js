app.factory('messageFactory',function($http){
  var factory = {
    getAllMessageFromChannel(id_channel){
      return $http.get('http://localhost:3000/messages/'+id_channel);
    }
    // sendMessageFromChanne
  }
  return factory;
});
