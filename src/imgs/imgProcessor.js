/**
 * Created by schoeu on 2017/3/23.
 */

var sharp = require('sharp');

function imgsPro(path, options) {
    sharp(path)
        .resize(options.w, options.h)
}

module.exports = {
    imgsPro: imgsPro
};
