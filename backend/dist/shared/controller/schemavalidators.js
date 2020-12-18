"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Joi = require("joi");
const BaseController_1 = require("../controller/BaseController");
var jwt = require('jsonwebtoken');
const objBaseController = new BaseController_1.default();
exports.default = (Schemas) => {
    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'put', 'delete'];
    // Joi validation options
    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        // stripUnknown: true, // remove unknown keys from the validated data
        escapeHtml: true,
        convert: false
    };
    // return the validation middleware
    return (req, res, next) => {
        const route = req.route.path;
        const method = req.method.toLowerCase();
        if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
            // get schema for the current route
            const _schema = _.get(Schemas, route);
            if (_schema) {
                // Validate req.body using the schema and validation options
                return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {
                    if (err) {
                        let joiErrorMessage;
                        if (objBaseController.objConstants.IS_SHOW_JOI_ERROR_MESSAGE) {
                            joiErrorMessage = {
                                status: 'FAILURE',
                                error: {
                                    original: err._object,
                                    // fetch only message and type from each error
                                    details: _.map(err.details, ({ message, type, context }) => ({
                                        message: message.replace(/['"]/g, ''),
                                        key: context.key,
                                        type,
                                    }))
                                }
                            };
                        }
                        else {
                            // Custom Error
                            joiErrorMessage = {
                                status: 'FAILURE',
                                error: {
                                    details: {
                                        message: objBaseController.objConstants.JOI_ERROR_MESSAGE
                                    }
                                }
                            };
                        }
                        // Send back the JSON error response
                        joiErrorMessage['statusCode'] = 520;
                        res.status(520).json(joiErrorMessage);
                    }
                    else {
                        next();
                    }
                });
            }
        }
        next();
    };
};
//# sourceMappingURL=schemavalidators.js.map