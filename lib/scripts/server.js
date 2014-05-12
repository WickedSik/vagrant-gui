var Vagrant = require('./vagrant.js');
var S = require('string');

function Server(dir) {
    this.directory = dir;
    this.vagrant = new Vagrant(this.directory);
}

/**
 * Commands:
 * X box
 * - destroy
 * - halt
 * - init
 * X package
 * X plugin
 * X provision
 * - reload
 * - resume
 * X ssh
 * X ssh-config
 * D status
 * - suspend
 * - up
**/

Server.prototype.destroy = function (cb) {
    this.vagrant.destroy(function(retval, data) {
        console.log('VDestroy:', arguments);
        cb.apply(null, [retval === 0]);
    });
};

Server.prototype.halt = function (cb) {
    this.vagrant.halt(function(retval, data) {
        console.log('VHalt:', arguments);
        cb.apply(null, [retval === 0]);
    });
};

Server.prototype.init = function (cb) {
    this.vagrant.init(function(retval, data) {
        console.log('VInit:', arguments);
        cb.apply(null, [retval === 0]);
    });
};

Server.prototype.reload = function (cb) {
    this.vagrant.reload(function(retval, data) {
        console.log('VReload:', arguments);
        cb.apply(null, [retval === 0]);
    });
};

Server.prototype.resume = function (cb) {
    this.vagrant.resume(function(retval, data) {
        console.log('VResume:', arguments);
        cb.apply(null, [retval === 0]);
    });
};

Server.prototype.suspend = function (cb) {
    this.vagrant.suspend(function(retval, data) {
        console.log('VSuspend:', arguments);
        cb.apply(null, [retval === 0]);
    });
};

Server.prototype.up = function (cb) {
    this.vagrant.up(function (retval, data) {
        console.log('VUp:', arguments);
        cb.apply(null, [retval === 0]);
    });
};

Server.prototype.status = function (cb) {
    this.vagrant.status(function (retval, data) {
        console.log('VStatus:', arguments);
        var i, line, status;

        data = data.join('').split("\n");

        //console.log('Data:', data);

        for(i = 0; i < data.length; i++) {
            line = data[i];
            if(S(line).startsWith('default')) {
                line = line.replace(/([\s+]|default|\([a-z]+\))/g, '');
                line = S(line).trim();

                status = line.toString();
            }
        }

        //console.log('Status: ', status);

        cb.apply(null, [retval === 0, status]);
    });
};

module.exports = Server;
