const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);



// serveur http listening on 3000
http.listen(3000, () => {
    console.log('listening on *:3000');
});

console.log("\nWaiting for client to connect...");



//Express
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// socketIO
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

    });


});




// Leap motion controller
Leap = require('leapjs/lib/index');
var controller = new Leap.Controller();
controller.connect();



controller.on("frame", function(frame) {
    // console.log("Frame: " + frame.id + " @ " + frame.timestamp);
    var str = "";
    for (var i in frame.handsMap) {
        var hand = frame.handsMap[i];

        console.log(hand.palmPosition[1]);
        console.log('velocity: ',hand.palmVelocity[1]);
       // io.emit('dataIO',123);
        io.emit('leap-event', {
            Leap : {
                position_y : hand.palmPosition[1],
                vitesse_y : hand.palmVelocity[1]
            }
        });
    }

},500);

/*
// Loop leapmotion
var controller = Leap.loop({enableGestures:true}, function(frame){
    var currentFrame = frame;
    var previousFrame = controller.frame(1);
    var tenFramesBack = controller.frame(10);
}*/

