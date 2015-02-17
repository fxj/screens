var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/screen', function(req, res){
  res.sendFile(__dirname + '/screen.html');
});
app.get('/ctrl', function(req, res){
  res.sendFile(__dirname + '/ctrl.html');
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/earth.png', function(req, res){
  res.sendFile(__dirname + '/earth.png');
});

io.sockets.on('connection', function(socket) {
 console.log('connection'); 
 socket.on('setChannel', function (data) {
  console.log('setChannel ' + JSON.stringify(data)); 
  socket.join(data.channelName);
 });
 socket.on('changes', function(data) {
  //console.log('changes ' + JSON.stringify(data)); 
  socket.broadcast.to('asdf').emit('changes',data);
  //socket.broadcast.to(data.channelName).emit('changes',data);
 });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
