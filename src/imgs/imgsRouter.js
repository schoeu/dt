/**
 * Created by schoeu on 2017/3/23.
 */

var path = require('path');
var filed = require('node-filed');
var xmlPro = require('xmlpro');
var imgProcessor = require('./imgProcessor');

var tempDirName = '__cache';

/**
 * 图片页面渲染
 *
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * */
function imgsRender(req, res) {
    res.render('imgs', {title: ''});
}

/**
 * 图片获取&处理
 *
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * */
function getImgs(req, res) {
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

            filed.on('end', function (data) {
                var size = imgsSize.split(',');
                // 如果只有一个数字,则高于宽设置为相同值
                if (size.length === 1) {
                    size[1] = size[0];
                }
                // 压缩打包完毕事件触发
                imgProcessor.on('end', function (d) {
                    res.json({
                        status: 0,
                        path: d
                    });
                });
                imgProcessor.imgsPro(data, tFilePath, {
                    w: size[0],
                    h: size[1],
                    q: imgsQ
                });
            });

            // 文件下载处理
            filed.download({
                srcs: rs,
                path: tFilePath
            });
        }
    });
}

/**
 * 图片下载
 *
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 * */
function downloadImgs (req, res) {
    var filename = req.params && req.params.filename;
    var filePath = path.join(__dirname, '../..', '__dist/' + filename);
    if (filename) {
        res.download(filePath)
    }
    else {
        res.end();
    }
}

/**
 * 导出功能方法
 * */
module.exports = {
    imgsRender: imgsRender,
    getImgs: getImgs,
    downloadImgs: downloadImgs
};
