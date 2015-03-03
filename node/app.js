/** BEGIN connect to neurosky **/
var neurosky = require('node-neurosky');
var client = neurosky.createClient({
	appName:'NodeNeuroSky',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
})

// bind receive data event
client.on('data',function(data){
	// if websocket server is running
	if(wss){
		// broadcast this latest data packet to all connected clients
		wss.broadcast(data);
	}
	console.log(data);
});
// initiate connection
client.connect();
/** END connect to neurosky **/

/** BEGIN start our websocket server **/
// start websocket server to broadcast
var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({port: 8080});

// broadcast function (broadcasts message to all clients)
wss.broadcast = function(data) {
    for(var i in this.clients)
        this.clients[i].send(JSON.stringify(data));
};

// bind each connection
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('[CLIENT] %s', message);
    });
    ws.send('You are connected to Mindwave Mobile');
});
/** END start our websocket server **/