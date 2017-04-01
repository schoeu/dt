/**
 * Created by schoeu on 2017/3/23.
 */

var xmlPro = require('xmlpro');
var path = require('path');
var pug = require('pug');
var xmlDownload = require('./xmlDownload');

var fileName = '';

/**
 * xml页面渲染
 *
 * @param {Object} req 请求对象
 * @return {Object} res 响应对象
 * */
function xmlRender(req, res) {
    var isPjax = req.headers['x-pjax'] === 'true';
    // 判断是pjax请求则返回html片段
    if (isPjax) {
        var xmlHtml = pug.renderFile(path.join(__dirname, '../..', 'views/xmlPjax.pug'), {title: ''});
        res.end(xmlHtml);
    }
    else {
        res.render('xml', {title: ''});
    }
}

/**
 * xml数据处理
 *
 * @param {Object} req 请求对象
 * @return {Object} res 响应对象
 * */
function xmlProcess(req, res) {
    var xmlStr = req.body.xmlBody || '';
    var xmlPath = req.body.xmlPath.trim() || '';

    xmlPro.getDatas(xmlStr, xmlPath, function (err, rs) {
        var returnInfo = {};
        if (err) {
            returnInfo = {
                status: 1,
                data: err.message || '解析错误'
            };
        }
        else {
            if ((rs.length > 0) && rs) {
                returnInfo = {
                    status: 0,
                    data: rs || '无对应信息'
                };
            }
            else {
                returnInfo = {
                    status: 0,
                    data: rs
                };
            }
            var dlFile = rs.length > 0 ? rs.toString() : rs;
            fileName = xmlDownload.wirte(JSON.stringify(dlFile));
        }
        res.json(returnInfo);
    });
}

/**
 * xml处理后数据下载
 *
 * @param {Object} req 请求对象
 * @return {Object} res 响应对象
 * */
function xmlDown(req, res) {
    if (fileName) {
        res.download(fileName);
    }
}

// 导出功能方法
module.exports = {
    xmlRender: xmlRender,
    xmlProcess: xmlProcess,
    xmlDown: xmlDown
};
