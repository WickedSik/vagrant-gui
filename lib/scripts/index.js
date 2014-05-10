var Server = require('./lib/scripts/server.js');

var x = new Server('/Users/jpdokter/Development/hack/hacking-about');

x.status(function () {
    console.log(arguments);
});
