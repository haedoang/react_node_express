'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _mysql = require('./utils/db/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _test = require('./utils/db/test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/api', _index2.default);

var penv = process.env;
console.dir(_mysql2.default);
_mysql2.default.initialize(penv);

exports.default = app;