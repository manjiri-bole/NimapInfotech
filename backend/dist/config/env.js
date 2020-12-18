"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// setup config based on environment 
const port = 3400;
exports.default = {
    // Production environment config 
    prod: {
        use_env_variable: '',
        DBServer: 'localhost',
        DBUser: 'root',
        DBPass: 'root',
        DBName: 'nimap_db',
        Port: 3306,
        Pool: {
            max: 20,
            acquire: 25000
        },
        Dialect: 'mysql',
        DialectModulePath: '',
        Driver: '',
    },
    // Stagging environment config 
    stag: {
        use_env_variable: '',
        DBServer: 'localhost',
        DBUser: 'root',
        DBPass: 'root',
        DBName: 'nimap_db',
        Port: 3306,
        Pool: {
            max: 20,
            acquire: 25000
        },
        Dialect: 'mysql',
        DialectModulePath: '',
        Driver: '',
    },
    // Development environment config 
    dev: {
        use_env_variable: '',
        DBServer: 'localhost',
        DBUser: 'root',
        DBPass: 'root',
        DBName: 'nimap_db',
        Port: 3306,
        Pool: {
            max: 20,
            acquire: 25000
        },
        Dialect: 'mysql',
        DialectModulePath: '',
        Driver: ''
    },
};
//# sourceMappingURL=env.js.map