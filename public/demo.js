var ws;
$(document).ready(function() {

var ws_url = document.URL.replace('http', 'ws');

function generator(data) { // Helper to create the contents of the console line
    var date = new Date();

    var prfx = $('<div class="console_prefix">').text(date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds());
    var line = $('<div class="console_line">').text(data);
    var console_line = $('<div class="container">');
    console_line.append(prfx).append(line);

    return console_line;
};

// Example of simple plain websocket (without serialize)

var wc_plain = $('div#console_plain');
ws_plain = $.websocks(ws_url + "plain_demo", {
    keepAlive: true,
    keepAliveInterval: 3000,

    onmessage: function (e, decoded) {
        var line = generator(decoded);
        wc_plain.append(line);
        line.get(0).scrollIntoView();
    }
});

// Example of serialized messaging (the backend have to support the same type of serialization)

var wc_json = $('div#console_json');
ws_json = $.websocks(ws_url + "json_demo", {
    keepAlive: true,
    keepAliveInterval: 3000,

    serializer: {
        encode: function (data) { return JSON.stringify({ msg: data }) },
        decode: function (data) { return JSON.parse(data) },
    },

    onmessage: function (e, decoded) {
        var line = generator(decoded.msg);
        wc_json.append(line);
        line.get(0).scrollIntoView();
    }
});

// Example of messaging with serialization at backend and no serialization on JS (kinda mix of the both from above)
var wc_plainjson = $('div#console_plainjson');
ws_plainjson = $.websocks(ws_url + "json_demo", {
    keepAlive: true,
    keepAliveInterval: 3000,

    onmessage: function (e, decoded) {
        var line = generator(decoded);
        wc_plainjson.append(line);
        line.get(0).scrollIntoView();
    }
});
});
