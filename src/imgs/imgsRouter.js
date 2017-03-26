/**
 * Created by schoeu on 2017/3/26.
 */

/**
 * Created by schoeu on 2017/3/23.
 */

var filed = require('node-filed');

function imgsRender(req, res, next) {
    res.render('imgs', {title: ''});
}

module.exports = {
    imgsRender: imgsRender
};
