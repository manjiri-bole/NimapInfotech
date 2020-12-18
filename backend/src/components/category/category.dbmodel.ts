const Sequelize = require('sequelize');
import BaseController from '../../shared/controller/BaseController';
const objBaseController = new BaseController();

export default objBaseController.SequelizeDBInstance.define('tblCategory', {
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