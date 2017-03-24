var express = require('express');
var router = express.Router();
var xmlRouter = require('../src/xml/xmlRouter');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// XML界面路由
router.get('/xmlparse', xmlRouter.xmlRender.bind(this));

// XML解析接口
router.post('/api/xmlparse', xmlRouter.xmlProcess.bind(this));

// XML解析接口
router.get('/api/xmlDownload', xmlRouter.xmlDown.bind(this));

module.exports = router;
