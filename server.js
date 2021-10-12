require("dotenv").config();
var express = require("express");
var http = require('http');
var socketio = require("socket.io");
var cors = require("cors");
var bodyParser = require("body-parser")
var dbConnection = require("./config/Db");
const port = process.env.PORT || 5000;
// Routes List
var app = express();
const server = http.createServer(app)
const io = socketio(server)
let {socketBox,getsocketBox} = require('./components/SocketController')

 var SocketRoute = require("./components/SocketRoutes");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))

dbConnection();

app.get("/", function (req, res) {
  res.send("Server is working");
});
//SuperAdmin --superAdmin
app.use("/superAdmin", SocketRoute);

io.on('connection', (socket) => {
  console.log('Ali user connected');
  socket.on('check',async ({index},callback) => {
    const {data}= await socketBox(index)       
    socket.emit('resultArray', {data})
  });

  socket.on('firstData',async () => {
    const {data}= await getsocketBox()       
    socket.emit('firstResult', {data})
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// server port listener
server.listen(port, (err) => {
  if (err) {
    console.log("something went wrong", error);
  } else {
    console.log(`server is working on port, ${port}`);
  }
});
