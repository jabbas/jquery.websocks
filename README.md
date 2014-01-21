jquery.websocks.js plugin
=========================

[jquery.websocks.js](http://github.com) - warm socks for JavaScript WebSocket.

Thin wrapper (and drop-in replacement) for JavaScript WebSocket.

Why another WebSocket wrapper?
------------------------------

Because, in my humble opinion, the original JavaScript WebSocket API is horribly designed!

By searching the web, you can find that you should use WebSocket API like this:

```js
var ws = new WebSocket('ws://some_url/to/websocket');
ws.onmessage = function (event) { do_something_with(event) };
ws.onclose = function (event) { do_something_with(event) };

// ... and so on with the rest of callbacks ...
```

Everything works, no one dies, we're fine.

But...

How we can be sure that we didn't missed some messages from the server?
The WebSocket is connecting during the construction, and we are defining the ```.onmessage``` afterwards...
What if we will encounter some "blocking" event between ```new WebSocket``` and setting ```.onmessage```? Or our JS thread in the browser will be stuck for some other reason?

It should be done like in this plugin (by providing the callbacks during construction) or there should be ```.connect()``` function/method which should be called after setting the callbacks explicitly by the programmer.

Anyway, besides the technical problems which may pop out, the original WebSocket API looks illogical for the technical guys (I'm assuming that the JS programmers are)...

About the other WebSocket wrappers which i found on the web, most of them have hardcoded JSON/XML/base64 serialization. This approach allows you to define yours with additional benefits.

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
- ```onopen```, ```onmessage```, ```onerror```, ```onclose``` - callback functions which will be triggered when certain event will happen (same like in original WebSocket, with small exception - see below).

Event callbacks
---------------

```onopen```, ```onmessage```, ```onerror```, ```onclose```

All of those functions work exactly like original JavaScript WebSocket, with small exception; they add another argument at the end which will contain decoded/deserialized data.

Example:

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

Example:

```js
websocks.esend("message in the bottle"); // Encodes and sends message to the web socket server
```

TODO
----

- automagic reconnect,
- plain js Object instead of jQuery wrapper/plugin
