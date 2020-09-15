"use strict";
import fs from 'fs';
import winston from 'winston';
import { createLogger, format, transports } from 'winston';
import process from 'process';
import colors from 'colors/safe';

import path from 'path';

require('dotenv').config({path: path.join(__dirname, "../../.env")});
const { combine, timestamp, label, printf } = format;

const logDir = process.env.LOG_DIR || 'logs';
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const myFormat = printf(info => {
	let message = info.message;
	if (info.level == 'error') {
		if (info.responseMessage) {
			message += " (response message : " + info.responseMessage + ")";
		}
		if (info.stack) {
			message += "\n" + info.stack;
		}
	}
	let fullMessage = `[#${process.pid}] ${info.timestamp} [${info.level}] ${message}`;
	if (info.level == 'error') {
		fullMessage = colors.red(fullMessage);
	}
	return fullMessage;
});

const getFilePath = function(file) {
	if(file.indexOf(".log") === -1) file += ".log";
	file = `${logDir}/${file}`;
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

const logger = winston.createLogger({
	exitOnError: false,
	format: combine(
		timestamp(),
		myFormat
	),
	transports: [
		new winston.transports.Console({
			colorize: true
		})
	]
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

export default logger;
