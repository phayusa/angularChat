app.factory("chanFactory",function($http){
  var factory = {
    getAllChannel: function() {
      return $http.get('http://localhost:3000/channels');
    },

    getChannel: function(id) {
      return $http.get('http://localhost:3000/channel/'+id);
    },

    addChannel: function(client){
      return $http.post('http://localhost:3000/channels/',client);
    },
    deleteChannel: function(id){
      return $http.delete('http://localhost:3000/channel/'+id);
    },
    modifyChannel : function(id, clientUpdate){
      console.log(id + " " + clientUpdate.nom);
      return $http.put('http://localhost:3000/channel/'+id,clientUpdate);
    }
  }
  return factory;
});
