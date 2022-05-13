const app = require("express")();
const server = require("http").createServer(app);

const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);
	console.log(socket.id)
	socket.on('newuser', function(username) {
		socket.username = username;
		console.log( socket.username + ' has connected');
	  });
		
	  
	var list = io.sockets.sockets;
	var l = []
    console.log("Connected sockets:");
    list.forEach(function(s) {
        console.log("    socket.id = ", s.id);
		l.push({id: s.id, name: s.username})
    });
	socket.emit("connectedUsers", l);


  

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));