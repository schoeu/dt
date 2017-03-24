/**
 * Created by schoeu on 2017/3/23.
 */

var xmlPro = require('xmlpro');
var xmlDownload = require('./xmlDownload');

var fileName = '';

function xmlRender(req, res, next) {
    res.render('xml', { title: '' });
}

function xmlProcess(req, res, next) {
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

function xmlDown(req, res, next) {
    if (fileName) {
        res.download(fileName);
    }
}

module.exports = {
    xmlRender: xmlRender,
    xmlProcess: xmlProcess,
    xmlDown: xmlDown
};
