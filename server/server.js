var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// Global variable
var dbName = "mongodb://localhost/chat";
var channelTable = "channels";
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');


// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Part database channel
app.get('/channels',function(req,res){
  console.log("receive port 8888 /channels");
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;

      db.collection(channelTable).find().toArray(function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
  });
})

app.get('/channel/:id',function(req,res){
  console.log("receive port 8888 /channel/"+req.params.id);
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      // console.log("ObjectId(\""+req.params.id+"\")");
      db.collection(channelTable).find({"_id":o_id}).toArray(function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
  });
})

app.post('/channels/', function(req, res) {
    var name = req.body.nom;
    var surname = req.body.prenom;

    MongoClient.connect(dbName, function(error, db) {
        if (error) throw error;

        db.collection(channelTable).insert(req.body, function (error, results) {
          if (error) throw error;
          // use insertedCount to know how many is insert
          res.json(results);
        });
        db.close();
    });
});

app.delete('/channel/:id',function(req,res){

  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      // use n to know it was delete
      db.collection(channelTable).deleteOne({"_id":o_id}, null, function (error, results) {
        if (error) throw error;
        res.json(results);
      });
      db.close();
  });
})

app.put('/channel/:id',function(req,res){
  // res.send(req.params.id + " "+req.body.nom+" "+req.body.prenom);
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.id);

      console.log("Before update");
      // use n to know it was delete
      db.collection(channelTable).update({"_id":o_id},{$set:{"nom":req.body.nom,"prenom":req.body.prenom}});
      console.log("After update");
      res.send("ok");
      db.close();

  });
})

io.on('connection', function(socket){
  console.log("coco s'est connecter");
  // socket.on('chat message', function(msg){
  //   io.emit('chat message', msg);
  // });
  // socket.join('room 237', function(){
  //  console.log(socket.rooms); // [ <socket.id>, 'room 237' ]
  //  io.to('room 237', 'a new user has joined the room'); // broadcast to everyone in the room
  // });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
