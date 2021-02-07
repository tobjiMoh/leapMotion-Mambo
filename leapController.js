
Leap = require('leapjs/lib/index');

var controller = new Leap.Controller();


controller.on("frame", function(frame) {
    // console.log("Frame: " + frame.id + " @ " + frame.timestamp);
    var str = "";
    for (var i in frame.handsMap) {
        var hand = frame.handsMap[i];
        console.log(hand.roll());
    }

});


console.log("\nWaiting for device to connect...");
controller.connect();