"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const joi_custom_1 = require("./joi.custom");
exports.customMsgForProjectNSuites = {
    language: {
        string: {
            base: 'must be of type string'
        },
        any: {
            empty: '(Mandatory Parameters not passed)',
            orderedLength: 'Only 1 ProjectName is allowed'
        },
        array: {
            orderedLength: 'Only 1 ProjectName is allowed'
        },
        number: {
            base: 'must be of type interger'
        }
    }
};
exports.customMsgString = {
    language: {
        string: {
            base: 'must be of type string'
        }
    }
};
exports.customMsgForDate = {
    language: {
        any: {
            empty: '(Mandatory parameters are not passed)'
        }
    }
};
exports.globalValidationSchema = Joi.object().keys({
    SearchString: joi_custom_1.default.stringInputAlphabetDigitHyphenUnderscoreSpace.allow(''),
    Pagination: joi_custom_1.default.pagination,
});
//# sourceMappingURL=shared.schema.js.map