"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../config/constants");
// Don't remove below import evenif not in use,
// it will not compile ts to js if removed
//import * as logger from '../logger/logger';
const SequelizeDBInstance_1 = require("../connection/SequelizeDBInstance");
const config_1 = require("../../config/config");
const DateOperations_1 = require("../controller/DateOperations");
class BaseController {
    constructor(fileName = __filename) {
        this.objConstants = constants_1.default;
        this.objConfig = config_1.default;
        this.SequelizeDBInstance = SequelizeDBInstance_1.default;
        this.dateOperations = new DateOperations_1.default();
    }
    // Send response to client
    sendResponse(httpResp, resp) {
        resp.status = resp.status ? 'SUCCESS' : 'FAILURE';
        if (httpResp) {
            httpResp.status(resp.statusCode).json(resp);
        }
    }
    // Get response structure for service to controller
    getResponseObject(data = [], statusFlag = true, statusCode = this.objConstants.HTTP_CODE.SUCCESS, message = '', sqlMessage) {
        if (Array.isArray(data) && !data.length && !message) {
            message = 'Data not found';
        }
        if (!this.objConstants.IS_SHOW_SQL_MESSAGE) {
            sqlMessage = undefined;
        }
        return {
            status: statusFlag,
            data: data,
            statusCode: statusCode,
            message: message,
            sqlMessage: sqlMessage,
        };
    }
    // Get query filter response object
    getFilterResponseObject(data = '', status = 200) {
        return {
            status: status,
            data: data,
            message: onmessage,
        };
    }
    // Convert array[] to object and set `valueForKey` value
    convertArrayToObject(array, valueForKey = 0) {
        return array.reduce((result, item) => {
            result[item] = valueForKey;
            return result;
        }, {});
    }
    // Convert array of object [{}] to object by `keyField` and set `valueForKey` value
    convertArrayOfObjectToObjectByKey(array, keyField, valueForKey = 0) {
        return array.reduce((obj, item) => {
            obj[item[keyField]] = valueForKey;
            return obj;
        }, {});
    }
    // Print any data
    printAsString(data = '---------------', label = 'Unknown label') {
        console.log(label, ` ---->>> `, JSON.stringify(data), ` <<<----`, label);
    }
    // Print any data
    print(data = '---------------', label = 'Unknown label') {
        console.log(label, ` ~~~~>>> `, data, ` <<<~~~~`, label);
    }
    // regx formatter: Apply regx for search query
    regxFormatter(objParams) {
        let arrFilter = [];
        if (Object.keys(objParams).length) {
            Object.keys(objParams).forEach(key => {
                let objRegx = {};
                objRegx[key] = { $regex: new RegExp(objParams[key], 'i') };
                arrFilter.push(objRegx);
            });
        }
        return arrFilter;
    }
    JoiErrors(error) {
        let message = {};
        error.details.forEach(element => {
            if (!(element.path in message)) {
                message[element.path] = element.message.replace(/['"]/g, '');
            }
        });
        return message;
    }
}
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map