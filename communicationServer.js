const app = require("express")();
const server = require("http").createServer(app);

const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "https://nettportal.netlify.app/",
		methods: [ "GET", "POST" ]
	}
});



app.use(cors(
	{
	  credentials: true,
	  origin: 'https://nettportal.netlify.app/'
	})
  );


const corsMiddleware = (req, res, next) => {
	res = applyCorsHeaders(res);
	if (req.method === 'OPTIONS') {
	  res.status(200).end()
	  return
	}
	next()
  }
  
  const applyCorsHeaders = res => {
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Origin', '*')
	// or res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
	res.setHeader(
	  'Access-Control-Allow-Headers',
	  'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)
	return res;
  }

  app.use(corsMiddleware);


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