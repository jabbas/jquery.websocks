(function ($) {

/*
TODO
 - autoReconnect
 - plain JavaScript (nothing fancy i think, just rewrite it as JS object)
*/

$.extend({

    websocks: function(url, options) {
        if (! window.WebSocket) {
            var alert_msg = "Your browser is too old to use this! WebSocket support is needed!";
            console.log(alert_msg);
            alert(alert_msg);
            return undefined;
        }

        this.defaults = {

            autoReconnect: false,   // TODO

            keepAlive: false,
            keepAliveInterval: 10000,
            keepAliveMessage: '_KEEP_ALIVE_',

            serializer: {
                encode: function (data) { return data },
                decode: function (data) { return data },
            },

            onopen:     false, // replace this by functions in options
            onmessage:  false, // replace this by functions in options
            onerror:    false, // replace this by functions in options
            onclose:    false, // replace this by functions in options

        };

        var protocols = options.protocols;
        delete options.protocols;

        var opts = $.extend({}, this.defaults, options);

        var ws;

        var wrappers = {
            onopen:     function(e) {
                opts.onopen && opts.onopen(e);
            },
            onmessage:  function(e) {
                var decoded = opts.serializer.decode(e.data);
                opts.onmessage && opts.onmessage(e, decoded);
            },
            onerror:    function(e) {
                opts.onerror && opts.onerror(e);
            },
            onclose:    function(e) {
                opts.onclose && opts.onclose(e);
            },
        }

        ws = new window.WebSocket(url, protocols);

        // Poor's man keep alive (JavaScript engine doesn't support PING/PONG frames)
        var intervalId;
        if (opts.keepAlive === true) {
            intervalId = setInterval(
                function () {
                    ws.readyState === ws.OPEN && ws.send(opts.keepAliveMessage);
                },
                opts.keepAliveInterval
            );

            // Clean up on close
            ws.addEventListener('close', function (e) { clearInterval(intervalId); });

        }

        $.extend(ws, wrappers);

        //serializer extended WebSocket.send
        ws.esend = function (data) {
            return this.send(opts.serializer.encode(data));
        };

        // Clean up when unloading
        $(window).unload(function () { ws.close(); ws = null });

        return ws;
    }

});
})(jQuery);
