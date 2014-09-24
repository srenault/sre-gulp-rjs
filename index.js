'use strict';

var es        = require('event-stream');
var fs        = require('fs');
var path      = require('path');
var requirejs = require('requirejs');

module.exports = function (options) {
    var baseUrl = options.baseUrl;
    return es.mapSync(function (file, cb) {
        var destPath = path.join(file.cwd, baseUrl, path.basename(file.path));
        var stream = fs.createWriteStream(destPath, {flags: 'w'});
        stream.write(file.contents, '', function() {
            var name = path.basename(file.path).replace(path.extname(file.path), '');
            options.outPath = path.join(options.baseUrl, name + '.js');
            requirejs.optimize(options);
        });
    });
};
