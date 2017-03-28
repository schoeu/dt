/**
 * Created by schoeu on 2017/3/23.
 */

var sharp = require('sharp');
var path = require('path');
var childProcess = require('child_process');
var EventEmitter = require('events').EventEmitter;

var event = new EventEmitter();

function imgsPro(data, tPath, options) {
    data = data || [];
    if (data && !Array.isArray(data)) {
        data = [data];
    }
    var length = data.length;
    var w = options.w;
    var h = options.h;
    var q = options.q;
    for (var i = 0; i < length; i++) {
        var item = data[i];
        var filename = item.filename;
        var extname = path.extname(filename);
        sharp(filename)
            .resize(parseInt(w, 10), parseInt(h, 10))
            .quality(parseInt(q, 10))
            .toFile(filename.replace(extname, '_pro' + extname), function() {
                event.emit('done');
            });
    }

    /**
     * 图片处理完毕,压缩打包
     * */
    event.on('done', function () {
        if (!--length) {
            var d = new Date();
            var name = d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds() +'.zip';
            childProcess.exec('zip -r ../__dist/' + name + ' ./*', {
                cwd: tPath
            }, function (err, result) {
                if (err) {
                    throw err;
                }
                event.emit('end', name);
            });
        }
    });
}

event.imgsPro = imgsPro;


module.exports = event;
