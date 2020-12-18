"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const BaseController_1 = require("../../shared/controller/BaseController");
const objBaseController = new BaseController_1.default();
exports.default = objBaseController.SequelizeDBInstance.define('tblCategory', {
    CategoryId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    CategoryName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
//# sourceMappingURL=category.dbmodel.js.map