const Sequelize = require('sequelize');
import BaseController from '../../shared/controller/BaseController';
const objBaseController = new BaseController();

export default objBaseController.SequelizeDBInstance.define('tblProduct', {
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