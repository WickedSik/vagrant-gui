var basepath = process.cwd();
var Server = require('./lib/scripts/server.js');
var jade = require('jade');

// var x = new Server('/Users/jpdokter/Development/hack/hacking-about');

// x.status(function () {
//    console.log(arguments);
//});

var servers;
if (localStorage.getItem('servers')) {
    servers = JSON.parse(localStorage.getItem('servers'));
} else {
    servers = [];
    localStorage.setItem('servers', JSON.stringify(servers));
}

console.info(localStorage.getItem('servers'));

var i = 0,
    statusTimeout;

$('.status').hide();
$('.server-list ul').empty();
$('.add-server-button').on('click', function (eve) {
    eve.preventDefault();

    $('.add-server').click();

    return false;
});

$('.add-server').on('change', function () {
    var f = $('.add-server').get(0).files;

    var dir = f[0].path;

    var test = new Server(dir);
    test.status(function (x, y) {
        if (x) {
            servers.push({
                title: f[0].name,
                path: dir
            });

            localStorage.setItem('servers', JSON.stringify(servers));

            $('.server-list ul').empty();
            for (i = 0; i < servers.length; i++) {
                tplServer(servers[i]);
            }
        }
    });
});

function setStatus(msg) {
    $('.status .message').text(msg);
    $('.status').alert().show();

    if (statusTimeout) {
        clearTimeout(statusTimeout);
    }

    statusTimeout = setTimeout(function () {
        $('.status').fadeOut();
    }, 3000);
}

function tplServer(server) {
    var tpl = jade.renderFile(basepath + '/lib/templates/server.jade', {
        server: server
    });
    var s = $(tpl);
    s.data('server', new Server(server.path));

    function updateStatus(x, status) {
        console.info('Server status:', status);

        $('.start', s).prop('disabled', true);
        $('.pause', s).prop('disabled', true);
        $('.stop', s).prop('disabled', true);

        switch (status) {
        case 'poweroff':
            $('.start', s).prop('disabled', false);
            break;
        case 'running':
            $('.pause', s).prop('disabled', false);
            $('.stop', s).prop('disabled', false);
            break;
        case 'saved':
            $('.start', s).prop('disabled', false);
            $('.stop', s).prop('disabled', false);
            break;
        }

        setStatus('done');
    }

    var vs = s.data('server');

    $('.start', s).on('click', function (eve) {
        setStatus('busy');

        eve.preventDefault();

        vs.up(function () {
            vs.status(updateStatus);
        });

        return false;
    });

    $('.pause', s).on('click', function (eve) {
        setStatus('busy');

        eve.preventDefault();

        vs.suspend(function () {
            vs.status(updateStatus);
        });

        return false;
    });

    $('.stop', s).on('click', function (eve) {
        setStatus('busy');

        eve.preventDefault();

        vs.halt(function () {
            vs.status(updateStatus);
        });

        return false;
    });

    vs.status(updateStatus);

    $('.server-list ul').append(s);
}

$(document).ready(function () {

    for (i = 0; i < servers.length; i++) {
        tplServer(servers[i]);
    }
});
