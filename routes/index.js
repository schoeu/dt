var express = require('express');
var router = express.Router();
var xmlRouter = require('../src/xml/xmlRouter');
var imgsRouter = require('../src/imgs/imgsRouter');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'dt'});
});

// XML界面路由
router.get('/xmls', xmlRouter.xmlRender.bind(this));

// XML解析接口
router.post('/api/xmlparse', xmlRouter.xmlProcess.bind(this));

// XML解析接口
router.get('/api/xmldownload', xmlRouter.xmlDown.bind(this));

// 图片路由
router.get('/imgs', imgsRouter.imgsRender.bind(this));

// 获取图片
router.post('/api/getimgs', imgsRouter.getImgs.bind(this));

// 下载图片
router.get('/api/download/:filename', imgsRouter.downloadImgs.bind(this));

module.exports = router;
