/**
 * Created by schoeu on 2017/3/23.
 */

var fs = require('fs');
var path = require('path');

module.exports = {
    /**
     * 文件保存方法
     *
     * @param {Array} data 文件内容
     * @return {string} filtPath 文件保存路径
     * */
    wirte: function (data) {
        var filtPath = path.join(__dirname, '../..', '__cache') + '/data.txt';
        fs.writeFile(filtPath, data, function (err) {
            if (err) {
                throw err;
            }
        });
        return filtPath;
    }
};