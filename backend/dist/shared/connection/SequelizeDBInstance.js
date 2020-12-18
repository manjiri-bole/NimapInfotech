"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const config_1 = require("../../config/config");
const DBConfig = config_1.default;
const SequelizeDBConn = new Sequelize(DBConfig.DBName, DBConfig.DBUser, DBConfig.DBPass, {
    host: DBConfig.DBServer,
    dialect: DBConfig.Dialect,
    port: Number(DBConfig.port),
    pool: DBConfig.pool,
    dialectModulePath: DBConfig.DialectModulePath,
    dialectOptions: {
        options: {
            driver: DBConfig.Driver,
            useUTC: false,
            dateStrings: true,
            typeCast: true
        },
    },
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    logging: false,
});
SequelizeDBConn.authenticate()
    .then(() => {
    console.log('Connected successfully to database..!!!');
})
    .catch(err => {
    console.error('Unable to connect to the database: ', err.message);
});
exports.default = SequelizeDBConn;
//# sourceMappingURL=SequelizeDBInstance.js.map