/**
 * Created by schoeu on 2017/3/23.
 */

var path = require('path');


var filed = require('node-filed');
var xmlPro = require('xmlpro');

function imgsRender(req, res, next) {
    res.render('imgs', {title: ''});
}

function getImgs(req, res, next) {
    var imgsStr = req.body.imgsBody || '';
    var imgsPath = req.body.imgsPath.trim() || '';
    xmlPro.getDatas(imgsStr, imgsPath, function (err, rs) {
        if (err) {
            return;
        }
        if (rs.length) {
            rs = rs.map(function (i) {
                return i.toString();
            });

            filed.on('data', function (err, d) {
                //res.json(d || {});
            });

            filed.on('end', function (data) {
                res.end('下载完成.');
            });

            filed.download({
                srcs: rs,
                path: path.join(__dirname, '../../__cache')
            });
        }
    });
}

module.exports = {
    imgsRender: imgsRender,
    getImgs: getImgs
};
