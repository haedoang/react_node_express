'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _dbMigrate2 = require('db-migrate');

var _dbMigrate3 = _interopRequireDefault(_dbMigrate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MySQL = function () {
    function MySQL() {
        _classCallCheck(this, MySQL);
    }

    _createClass(MySQL, null, [{
        key: 'initialize',
        value: function initialize(penv) {
            var poolCluster = _mysql2.default.createPoolCluster();

            var prodConfig = {
                connectionLimit: penv.PROD_CONNECTION_LIMIT,
                host: penv.PROD_DATABASE_URL,
                user: penv.PROD_DATABASE_USER,
                password: penv.PROD_DATABASE_PASSWORD,
                database: penv.PROD_DATABASE_SCHEMA
            };

            var devConfig = {
                connectionLimit: penv.DEV_CONNECTION_LIMIT,
                host: penv.DEV_DATABASE_URL,
                user: penv.DEV_DATABASE_USER,
                password: penv.DEV_DATABASE_PASSWORD,
                database: penv.DEV_DATABASE_SCHEMA
            };

            poolCluster.add("PROD", prodConfig);
            poolCluster.add("DEV", devConfig);
            MySQL.poolCluster = poolCluster;

            return MySQL.dbMigrate(devConfig).then(function () {
                MySQL.statusCheck();
                return true;
            });
        }
    }, {
        key: 'statusCheck',
        value: function statusCheck() {
            MySQL.executeQuery({ sql: "SELECT 1+? AS res" }, [2], "PROD").then(function (res) {
                console.log(res, ' : PROD OK');
            }).catch(function (err) {
                console.log(err, ' : PROD BAD');
            });

            MySQL.executeQuery({ sql: "SELECT 1+? AS res" }, [3], "DEV").then(function (res) {
                console.log(res, ' : DEV OK');
            }).catch(function (err) {
                console.log(err, ' : DEV BAD');
            });
        }
    }, {
        key: 'executeQuery',
        value: function executeQuery(option, params, poolNS) {
            return new Promise(function (resolve, reject) {
                var startTime = new Date() * 1;
                var sql = option.sql;

                var pool = void 0;
                if (!poolNS) pool = MySQL.getPoolByQuery(sql);else pool = MySQL.poolCluster.of(poolNS);

                pool.query(option, params, function (err, res, fields) {
                    var endTime = new Date() * 1;
                    MySQL.logQuery(option.sql, params);
                    //logger.info(colors.green("execution time : " + (endTime - startTime) + "ms"));
                    console.log('execute time : ' + (endTime + startTime) + 'ms');
                    if (err) {
                        console.log('query err : ', err);
                        reject(err);
                        return;
                    }

                    resolve(res);
                });
            });
        }
    }, {
        key: 'dbMigrate',
        value: function dbMigrate(config) {
            return MySQL.createSchema(config).then(function () {
                var migrator = _dbMigrate3.default.getInstance(true);
                return migrator.up();
            }, function (err) {
                throw err;
            });
        }
    }, {
        key: 'createSchema',
        value: function createSchema(config) {
            return new Promise(function (resolve, reject) {
                var connection = _mysql2.default.createConnection({
                    host: config.host,
                    user: config.user,
                    password: config.password
                });

                connection.connect();
                connection.query('\n                CREATE SCHEMA IF NOT EXISTS `' + process.env.DEV_DATABASE_SCHEMA + '` DEFAULT CHARACTER SET utf8;\n            ', function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('database initialized');
                        resolve(true);
                    }
                });
                connection.end();
            });
        }
    }]);

    return MySQL;
}();

exports.default = MySQL;