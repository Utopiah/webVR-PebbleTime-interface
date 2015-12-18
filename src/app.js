var UI = require('ui');

var ws = new WebSocket('ws://fabien.benetou.fr:8889');
// Replace with IP of computer running server

var connected = false;

ws.onopen = function () { 
  ws.send('pebble connected');
  console.log('inside the onconnect event');
  connected = true;
};

var Vibe = require('ui/vibe');

var main = new UI.Card({
  title: 'Connected (v2026)',
  icon: 'images/menu_icon.png',
  subtitle: 'Waiting for data',
  body: 'Press up, middle or down buttons to send data.'
});

main.show();

ws.onmessage = function (event) { 
    main.body(event.data);
    console.log(event.data);
    // Send a long vibration to the user wrist
  if (event.data.toString()=="vibrate"){
    Vibe.vibrate('long');
  }
};

main.on('click', function(e) {
  main.subtitle('Button ' + e.button + ' pressed.');
  if (connected){
     ws.send(e.button + ' button pressed ');
  }
});

var Accel = require('ui/accel');
Accel.on('tap', function(e) {
  console.log('Tap event on axis: ' + e.axis + ' and direction: ' + e.direction);
  if (connected){
     ws.send('Tap event on axis: ' + e.axis + ' and direction: ' + e.direction);
  }
});