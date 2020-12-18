"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const BaseController_1 = require("../../shared/controller/BaseController");
const objBaseController = new BaseController_1.default();
exports.default = objBaseController.SequelizeDBInstance.define('tblProduct', {
    ProductId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ProductName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
//# sourceMappingURL=product.dbmodel.js.map