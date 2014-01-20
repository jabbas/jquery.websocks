jquery.websocks.js plugin
=========================

[jquery.websocks.js](http://github.com) - warm socks for JavaScript WebSocket.

Thin wrapper (and drop-in replacement) for JavaScript WebSocket.

Requirements
------------

[jQuery](http://jquery.com/) (tested on v2.0.3 but should work without glitches on older versions too)

Features
--------

Same as original JavaScript WebSocket and additionally:

* keepalive
* automatic serialization and deserialization
* automatic disconnection (when closing window)

Installation
------------

Just put it somewhere on your web server and load it into your web page.

Usage
-----

```js
var websocket = $.websocks("ws://your/websocket/socket", options);
```

It returns (almost) plain, native JavaScript WebSocket object.

Options
-------

These are the default values

```js
options = {
	protocols: [],

     keepAlive: false,
     keepAliveInterval: 10000,
     keepAliveMessage: '_KEEP_ALIVE_',

     serializer: {
         encode: function () {},
         decode: function () {},
     },

     onopen:     function() {},
     onmessage:  function() {},
     onerror:    function() {},
     onclose:    function() {},

};
```

- ```protocols``` - same as second parameter of original WebSocket (default: None),
- ```keepAlive``` - if true turns on the "Poor's man keep alive",
- ```keepAliveInterval``` - how often send keep alive packet to the server in milliseconds (default: 10000),
- ```KeepAliveMessage``` - the contents of the message which will be sent to server (default: _KEEP_ALIVE_),
- ```serializer``` - simple object with two functions:
  - ```encode``` - to encode the message prior to sending,
  - ```decode``` - to decode the message after getting it from the server,
- ```onopen```, ```onmessage```, ```onerror```, ```onclose``` - callback functions which will be triggered when certain event will happen (same like in original WebSocket, with small - see below).

Event callbacks
---------------

```onopen```, ```onmessage```, ```onerror```, ```onclose```

All of those functions works exactly like original JavaScript WebSocket, with small exception; they add another argument at the end which will contain decoded/deserialized value of data.

E.g.:

```js
on message = function (e, decoded_data) {
	console.log("Event" + e);
	console.log("Original data is: " + e.data);
	console.log("Decoded data " + decoded_data);
}
```

Additional function(s)
----------------------

```.esend(data)``` - acts exactly the same way as original ```.send(data)``` but uses serializer.encode prior to sending.

E.g.:

```
websocks.esend("message in the bottle"); // Encodes and sends message to the web socket server
```

TODO
----

- automagic reconnect,
- plain js Object instead of jQuery wrapper/plugin

