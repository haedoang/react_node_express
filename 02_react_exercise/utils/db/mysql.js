import mysql from 'mysql';
import dbMigrate from 'db-migrate';

class MySQL {

    static initialize(penv){
        let poolCluster = mysql.createPoolCluster();

        let prodConfig = {
            connectionLimit : penv.PROD_CONNECTION_LIMIT,
            host : penv.PROD_DATABASE_URL,
            user : penv.PROD_DATABASE_USER,
            password : penv.PROD_DATABASE_PASSWORD,
            database : penv.PROD_DATABASE_SCHEMA
        }

        let devConfig = {
            connectionLimit : penv.DEV_CONNECTION_LIMIT,
            host : penv.DEV_DATABASE_URL,
            user : penv.DEV_DATABASE_USER,
            password : penv.DEV_DATABASE_PASSWORD,
            database : penv.DEV_DATABASE_SCHEMA
        }

        poolCluster.add("PROD", prodConfig);
        poolCluster.add("DEV", devConfig);
        MySQL.poolCluster = poolCluster;

        return MySQL.dbMigrate(devConfig)
            .then(()=>{
                MySQL.statusCheck();
                return true;
            })
    }

    static statusCheck(){
        MySQL.executeQuery({sql: "SELECT 1+? AS res"}, [2], "PROD")
        .then((res) => {console.log(res, ' : PROD OK')})
        .catch((err) => { console.log(err, ' : PROD BAD')});
        
        MySQL.executeQuery({sql: "SELECT 1+? AS res"}, [3], "DEV")
        .then((res) => {console.log(res, ' : DEV OK')})
        .catch((err) => { console.log(err, ' : DEV BAD')});
    }

    static executeQuery(option, params, poolNS){
        return new Promise((resolve, reject) => {
                    let startTime = new Date() * 1;
                    let sql = option.sql;

                    let pool;
                    if(!poolNS) pool = MySQL.getPoolByQuery(sql);
                    else pool = MySQL.poolCluster.of(poolNS);

                    pool.query(option, params, (err, res, fields) => {
                        let endTime = new Date() * 1;
                        MySQL.logQuery(option.sql, params);
                        //logger.info(colors.green("execution time : " + (endTime - startTime) + "ms"));
                        console.log('execute time : ' + (endTime + startTime) + 'ms');
                        if(err) {
                            console.log('query err : ', err);
                            reject(err);
                            return;
                        }

                        resolve(res);
                    });
                });
    }


    static dbMigrate(config){
        return MySQL.createSchema(config)
        .then(() => {
            let migrator = dbMigrate.getInstance(true);
            return migrator.up();
        }, (err) => {
            throw err;
        });
    }

    static createSchema(config){
        return new Promise((resolve, reject)=> {
            let connection = mysql.createConnection({
                host: config.host,
                user: config.user,
                password: config.password
            });

            connection.connect();
            connection.query(`
                CREATE SCHEMA IF NOT EXISTS \`${process.env.DEV_DATABASE_SCHEMA}\` DEFAULT CHARACTER SET utf8;
            `, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('database initialized')
                    resolve(true);
                }
            });
            connection.end();
        } )
    }

}


export default MySQL;