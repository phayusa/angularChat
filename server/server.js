var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// Global variable
var dbName = "mongodb://localhost/chat";
var channelTable = "channels";
var messageTable = "messages";
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser');

var createChannel = function(channel){

  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;

      db.collection(channelTable).insert(channel, function (error, results) {
        if (error) throw error;
        // use insertedCount to know how many is insert
        res.json(results);
      });
      db.close();
  });
}

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


// Getting all the message with the channel id
app.get('/messages/:channel_id',function(req,res){
  console.log("receive port 8888 /channel/"+req.params.channel_id);
  MongoClient.connect(dbName, function(error, db) {
      if (error) throw error;
      var o_id = new ObjectID(req.params.channel_id);

      // console.log("ObjectId(\""+req.params.id+"\")");
      db.collection(messageTable).find({"channel_id":o_id}).toArray(function (error, results) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      });
      db.close();
  });
})



// socket.emit('message',"ttttt");
// io.sockets.in(roomToJoin).emit('message', 'what is going on, party people?');
// io.sockets.in("ddiusdhuisdh").emit('sdçusjusjh');
// io.emit('chat message', msg);


// On the connection of one socket
io.on('connection', function(socket){
  console.log("coco s'est connecter");

  socket.on("enter room", function(roomToJoin){

    var jsonRoom = {"name":roomToJoin};

    MongoClient.connect(dbName, function(error, db) {
        if (error) throw error;

        db.collection(channelTable).find(jsonRoom).toArray(function (error, results) {
          if(results.size != 0){
            console.log(roomToJoin+" already exist. Not created.");
          }else{
            db.collection(channelTable).insert(jsonRoom, function (error, results) {
              if (error) throw error;
              console.log(roomToJoin+" created.");
            });
          }
        });
        db.close();
    });

    console.log("join on "+roomToJoin);
    socket.join(roomToJoin);


  });

  socket.on("leave room",function(roomToQuit){
    console.log("exit on "+roomToQuit);
    socket.leave(roomToQuit);
  });

  socket.on('send message', function(data, id_channel) {
      socket.emit("receive message",data);
      MongoClient.connect(dbName, function(error, db) {
          if (error) throw error;
          var o_id = new ObjectID(id_channel);

          var newJson = {"channel_id":o_id,"text":data};

          // console.log("ObjectId(\""+req.params.id+"\")");
          db.collection(messageTable).insert(newJson, function (error, results) {
            if (error) throw error;
            // use insertedCount to know how many is insert
          });
          db.close();

      });
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
