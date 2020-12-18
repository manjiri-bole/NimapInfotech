
import Constants from '../../config/constants';
import { ResponseModel } from '../models/response.model';
// Don't remove below import evenif not in use,
// it will not compile ts to js if removed
//import * as logger from '../logger/logger';
import SequelizeDBInstance from '../connection/SequelizeDBInstance';
import Config from '../../config/config';
import DateOperations from '../controller/DateOperations';

class BaseController {

    dateOperations: DateOperations;
    objConstants = Constants;
    objConfig = Config;
    SequelizeDBInstance = SequelizeDBInstance;
    logger;
    constructor(fileName = __filename) {
        this.dateOperations = new DateOperations();
    }

    // Send response to client
    sendResponse(httpResp, resp: ResponseModel) {
        resp.status = resp.status ? 'SUCCESS' : 'FAILURE';
        if (httpResp) {
            httpResp.status(resp.statusCode).json(resp);
        }
    }

    // Get response structure for service to controller
    getResponseObject(data: any = [], statusFlag: boolean = true,
        statusCode: number = this.objConstants.HTTP_CODE.SUCCESS,
        message: any = '', sqlMessage?: any): ResponseModel {
        if (Array.isArray(data) && !data.length && !message) {
            message = 'Data not found';
        }
        if (!this.objConstants.IS_SHOW_SQL_MESSAGE) {
            sqlMessage = undefined;
        }
        return <ResponseModel>{
            status: statusFlag,
            data: data,
            statusCode: statusCode,
            message: message,
            sqlMessage: sqlMessage,
        };
    }

    // Get query filter response object
    getFilterResponseObject(data: any = '', status: number | boolean = 200): Object {
        return {
            status: status,
            data: data,
            message: onmessage,
        };
    }

    // Convert array[] to object and set `valueForKey` value
    convertArrayToObject(array: Array<any>, valueForKey: any = 0): Object {
        return array.reduce((result, item) => {
            result[item] = valueForKey;
            return result;
        }, {})
    }

    // Convert array of object [{}] to object by `keyField` and set `valueForKey` value
    convertArrayOfObjectToObjectByKey(array: Array<any>, keyField: string, valueForKey: any = 0): Object {
        return array.reduce((obj, item) => {
            obj[item[keyField]] = valueForKey
            return obj
        }, {})
    }

    // Print any data
    printAsString(data: any = '---------------', label = 'Unknown label') {
        console.log(label, ` ---->>> `, JSON.stringify(data), ` <<<----`, label);
    }

    // Print any data
    print(data: any = '---------------', label = 'Unknown label') {
        console.log(label, ` ~~~~>>> `, data, ` <<<~~~~`, label);
    }

    // regx formatter: Apply regx for search query
    regxFormatter(objParams) {
        let arrFilter = [];
        if (Object.keys(objParams).length) {
            Object.keys(objParams).forEach(key => {
                let objRegx = {};
                objRegx[key] = { $regex: new RegExp(objParams[key], 'i') }
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
export default BaseController;