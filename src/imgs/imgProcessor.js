/**
 * Created by schoeu on 2017/3/23.
 */

var sharp = require('sharp');
var path = require('path');

function imgsPro(data, options) {
    data = data || [];
    if (data && !Array.isArray(data)) {
        data = [data];
    }
    var w = options.w;
    var h = options.h;
    var q = options.q;
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var filename = item.filename;
        var extname = path.extname(filename);
        sharp(filename)
            .resize(parseInt(w, 10), parseInt(h, 10))
            .quality(parseInt(q, 10))
            .toFile(filename.replace(extname, '_pro' + extname));
    }
}

module.exports = {
    imgsPro: imgsPro
};
