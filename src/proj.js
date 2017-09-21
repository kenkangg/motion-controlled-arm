var five = require('johnny-five'),
    WebSocket = require('ws'),
    ws = new WebSocket('ws://127.0.0.1:6437'),
    board = new five.Board(),
    LeapFrame = require('./lib/leapFrame'),
    Joint = require('./lib/joint'),
    frame,
    i = 0;

board.on('ready',function() {
         
         
         var servoPitch = new Joint({
            
            minPos: 0,
            maxPos: 175,
            pin: 11,
            range: [0,200]
         });
         
         var servoNod = new Joint({
            minPos: 0,
            maxPos: 400,
            pin: 10,
            range: [20, 150]
         })
         
         var servoRoll = new Joint({
            minPos: -60,
            maxPos: 430,
            pin: 9,
            range: [0,200]
         })
         
         var servoClaw = new Joint({
            minPos:0,
            maxPos:50,
            pin:6,
            range:[0,100]
         })
         
         ws.on('message',function(data,flags) {
               //i++;
               //if (i%3 == 0) {
                    frame = new LeapFrame(data);
                    if(frame.valid) {
                        servoPitch.move(200 - frame.palmPosition.z);
                        servoRoll.move(200 - frame.palmPosition.x);
                        servoNod.move(frame.palmPosition.y);
                        servoClaw.move(100-frame.fingerAngleY);
               
                    }
                    //i = 0;
               //}
               });
         
         
         
         });




