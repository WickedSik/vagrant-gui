var vagrant = require('./lib/scripts/vagrant.js');

function Server(dir) {
    this.directory = dir;
}

Server.prototype.up = function (cb) {
    process.chdir(this.directory);
    vagrant.up(function (status, data) {
        console.log('VUp:', arguments);
        cb.apply(null, []);
    });
};

Server.prototype.status = function (cb) {
    process.chdir(this.directory);
    vagrant.status(function (status, data) {
        console.log('VStatus:', arguments);
        cb.apply(null, []);
    });
};

var x = new Server('/Users/jpdokter/Development/hack/hacking-about');

x.status(function () {
    alert('Done!');
});
