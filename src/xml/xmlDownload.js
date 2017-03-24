/**
 * Created by schoeu on 2017/3/23.
 */

var fs = require('fs');
var path = require('path');

module.exports = {
    wirte: function (data) {
        var filtPath = path.join(__dirname, '../..', '__cache') + '/data.txt';
        fs.writeFile(filtPath, data, function (err) {
            if (err) {
                console.log(err);
            }
        });
        return filtPath;
    }
};