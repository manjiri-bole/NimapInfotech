const Sequelize = require('sequelize');
import Config from '../../config/config';

const DBConfig = Config;
const SequelizeDBConn = new Sequelize(DBConfig.DBName, DBConfig.DBUser, DBConfig.DBPass,
  {
    host: DBConfig.DBServer,
    dialect: DBConfig.Dialect,
    port: Number(DBConfig.port),
    pool: DBConfig.pool,
    dialectModulePath: DBConfig.DialectModulePath,
    dialectOptions: {
      options: {
        driver: DBConfig.Driver,
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
      },
    },
    define: {
      freezeTableName: true,
      timestamps: false, // true by default    
    },
    logging: false,
  })

SequelizeDBConn.authenticate()
  .then(() => {
    console.log('Connected successfully to database..!!!');
  })
  .catch(err => {
    console.error('Unable to connect to the database: ', err.message);
  });

export default SequelizeDBConn