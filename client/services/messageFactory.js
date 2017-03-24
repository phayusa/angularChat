app.factory('messageFactory',function($http){
  var factory = {
    getAllMessageFromChannel:function(id_channel){
      return $http.get('http://localhost:3000/messages/'+id_channel);
    }
  }
  return factory;
});
