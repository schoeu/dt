/**
 * Created by schoeu on 2017/3/23.
 */

var path = require('path');

var imgProcessor = require('./imgProcessor');

var filed = require('node-filed');
var xmlPro = require('xmlpro');

var tempDirName = '__cache';

function imgsRender(req, res, next) {
    res.render('imgs', {title: ''});
}

function getImgs(req, res, next) {
    var imgsStr = req.body.imgsBody || '';
    var imgsPath = req.body.imgsPath.trim() || '';
    var imgsSize = req.body.imgsSize.trim() || '10000, 10000';
    var imgsQ = req.body.imgsQ;
    var tFilePath = path.join(__dirname, '../../', tempDirName);
    imgsQ = imgsQ.trim() || 100;
    xmlPro.getDatas(imgsStr, imgsPath, function (err, rs) {

        if (err) {
            return;
        }
        if (rs.length) {
            rs = rs.map(function (i) {
                return i.toString();
            });

            filed.on('data', function (err, d) {
            });

            filed.on('end', function (data) {
                res.end('下载完成.');
                var size = imgsSize.split(',');
                if (size.length === 1) {
                    size[1] = size[0];
                }
                imgProcessor.imgsPro(data, tFilePath, {
                    w: size[0],
                    h: size[1],
                    q: imgsQ
                });
            });

            filed.download({
                srcs: rs,
                path: tFilePath
            });
        }
    });
}

module.exports = {
    imgsRender: imgsRender,
    getImgs: getImgs
};
