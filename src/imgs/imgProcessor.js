/**
 * Created by schoeu on 2017/3/23.
 */

var sharp = require('sharp');
var path = require('path');
var childProcess = require('child_process');
var EventEmitter = require('events').EventEmitter;


function imgsPro(data, tPath, options) {
    var event = new EventEmitter();

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
            .toFile(filename.replace(extname, '_pro' + extname), function(err, info) {
                event.emit('done');
            });
    }

    /**
     * 图片处理完毕,压缩打包
     * */
    event.on('done', function () {
        if (!--length) {
            childProcess.exec('zip -r ../__dist/' + Date.now() + '.zip ./*', {
                cwd: tPath
            }, function (err, result) {
                if (err) {
                    throw err;
                }
            });
        }
    });
}



module.exports = {
    imgsPro: imgsPro
};
