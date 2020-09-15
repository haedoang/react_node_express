'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _dbMigrate2 = require('db-migrate');

var _dbMigrate3 = _interopRequireDefault(_dbMigrate2);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MySQL = function () {
    function MySQL() {
        _classCallCheck(this, MySQL);
    }

    _createClass(MySQL, null, [{
        key: 'initialize',
        value: function initialize(penv) {
            //create pool cluster;
            var poolCluster = _mysql2.default.createPoolCluster();

            var masterConfig = {
                connectionLimit: penv.DB_CONN_LIMIT,
                host: penv.DB_HOST,
                user: penv.DB_USER,
                password: penv.DB_PASS,
                database: penv.DB_NAME
            };

            var slave1Config = {
                connectionLimit: penv.DB_CONN_LIMIT,
                host: penv.SLAVE_DB_HOST,
                user: penv.SLAVE_DB_USER,
                password: penv.SLAVE_DB_PASS,
                database: penv.SLAVE_DB_NAME
            };

            poolCluster.add('MASTER', masterConfig);
            poolCluster.add('SLAVE1', slave1Config);
            MySQL.poolCluster = poolCluster;

            return MySQL.dbMigrate(masterConfig).then(function () {
                MySQL.statusCheck();
                return true;
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
        key: 'statusCheck',
        value: function statusCheck() {
            MySQL.executeQuery({ sql: "SELECT 1+ ? AS RES" }, [2], "MASTER");
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
                connection.query('\n                CREATE SCHEMA IF NOT EXISTS `' + process.env.DB_NAME + '` DEFAULT CHARACTER SET utf8;\n            ', function (err, res) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        _logger2.default.info(colors.green("database initialized"));
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