"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

var _safe = require('colors/safe');

var _safe2 = _interopRequireDefault(_safe);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config({ path: _path2.default.join(__dirname, "../../.env") });
var combine = _winston.format.combine,
    timestamp = _winston.format.timestamp,
    label = _winston.format.label,
    printf = _winston.format.printf;


var logDir = _process2.default.env.LOG_DIR || 'logs';
if (!_fs2.default.existsSync(logDir)) {
	_fs2.default.mkdirSync(logDir);
}

var myFormat = printf(function (info) {
	var message = info.message;
	if (info.level == 'error') {
		if (info.responseMessage) {
			message += " (response message : " + info.responseMessage + ")";
		}
		if (info.stack) {
			message += "\n" + info.stack;
		}
	}
	var fullMessage = '[#' + _process2.default.pid + '] ' + info.timestamp + ' [' + info.level + '] ' + message;
	if (info.level == 'error') {
		fullMessage = _safe2.default.red(fullMessage);
	}
	return fullMessage;
});

var getFilePath = function getFilePath(file) {
	if (file.indexOf(".log") === -1) file += ".log";
	file = logDir + '/' + file;
	return file;
};

// export const createFileLogger = function(filename) {
// 	const logger = winston.createLogger({
// 		exitOnError: false,
// 		format: combine(
// 			timestamp(),
// 			myFormat
// 		),
// 		transports: [
// 			new winston.transports.File({
// 				filename: getFilePath(filename)
// 			})
// 		]
// 	});
// 	return logger;
// }

var logger = _winston2.default.createLogger({
	exitOnError: false,
	format: combine(timestamp(), myFormat),
	transports: [new _winston2.default.transports.Console({
		colorize: true
	})]
});

//// write logfile only in development mode.
//if (process.env.NODE_ENV === 'development') {
//	logger.addFileWithName = function(filename) {
//		logger.add(new winston.transports.File({
//			filename: getFilePath(filename)
//		}));
//	}
//
//	logger.addFile = function(config) {
//		logger.add(new winston.transports.File(config));
//	}
//
//	logger.addFileWithName('all-logs');
//}

exports.default = logger;