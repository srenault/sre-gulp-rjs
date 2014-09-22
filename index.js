'use strict';

var es        = require('event-stream');
var fs        = require('fs');
var path      = require('path');
var requirejs = require('requirejs');

//node r.js -o baseUrl=. paths.jquery=some/other/jquery name=main out=main-built.js

module.exports = function (options) {
    return es.mapSync(function (file, cb) {
        var destPath = path.join(file.cwd, options.baseUrl, path.basename(file.path));
        var stream = fs.createWriteStream(destPath, {flags: 'w'});
        stream.write(file.contents, '', function() {
            var name = path.basename(file.path).replace(path.extname(file.path), '');
            options.outPath = path.join(options.baseUrl, name + '.js');
            requirejs.optimize(options);
        });
    });
};
