import mysql from 'mysql';
import dbMigrate from 'db-migrate';
import colors from 'colors';



import logger from '../logger';

class MySQL {

    
    static initialize(penv){
        //create pool cluster;
        let poolCluster = mysql.createPoolCluster();
        
		let masterConfig = {
			connectionLimit : penv.DB_CONN_LIMIT,
			host            : penv.DB_HOST,
			user            : penv.DB_USER,
			password        : penv.DB_PASS,
			database        : penv.DB_NAME
		};

		let slave1Config = {
			connectionLimit : penv.DB_CONN_LIMIT,
			host            : penv.SLAVE_DB_HOST,
			user            : penv.SLAVE_DB_USER,
			password        : penv.SLAVE_DB_PASS,
			database        : penv.SLAVE_DB_NAME
        };
        
        poolCluster.add('MASTER', masterConfig);
		poolCluster.add('SLAVE1', slave1Config);
		MySQL.poolCluster = poolCluster;

        return MySQL.dbMigrate(masterConfig)
        .then(() => {
            MySQL.statusCheck();
            return true;
        });
    }

    static dbMigrate(config){
        return MySQL.createSchema(config)
        .then( () => {
            let migrator = dbMigrate.getInstance(true);
            return migrator.up();
        }, (err) => {
            throw err;
        });
    }

    static statusCheck(){
        MySQL.executeQuery({sql : "SELECT 1+ ? AS RES"},[2],"MASTER")
    }

    static createSchema(config){
       
        return new Promise((resolve, reject)=>{
        
            let connection = mysql.createConnection({
                host : config.host,
                user : config.user,
                password : config.password
            });

            connection.connect();
            connection.query(`
                CREATE SCHEMA IF NOT EXISTS \`${process.env.DB_NAME}\` DEFAULT CHARACTER SET utf8;
            `,(err,res)=> {
                if(err) {
                    reject(err);
                } else {
                    logger.info(colors.green('database initialized'));
                    resolve(true);
                }
            });

            connection.end();
        })
    }
}

export default MySQL;