"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseJoi = require("joi");
const htmlStrip_custom_1 = require("./htmlStrip.custom");
const Joi = BaseJoi.extend(htmlStrip_custom_1.htmlStrip).extend(joiCustomStringAsNumber);
const BaseController_1 = require("../controller/BaseController");
const objBaseController = new BaseController_1.default(__filename);
// must be only alphabet, digit, hyphen, underscore or space
const AlphabetDigitHyphenUnderscoreSpace = /^[a-zA-Z0-9 _-]*$/;
// must be only alphabet, digit, hyphen or underscore
const AlphabetDigitHyphenUnderscore = /^[a-zA-Z0-9_-]*$/;
// Common keys that are used in this schema
const stringInput = Joi.string().trim().htmlStrip().required().replace(/\s\s+/g, ' ');
const anyStringInput = Joi.string().trim().required().replace(/\s\s+/g, ' ');
const zeroNumberInput = Joi.number().required().min(0).max(99999999999);
const numberInput = Joi.number().required().min(1).max(99999999999);
const emailInput = Joi.string().email().regex(/^([A-Za-z0-9_\-\.])+\@/).required();
const stringInputValidation = Joi.string().regex(/^[a-zA-Z\s]*$/).required();
const stringValidation = Joi.string().regex(/^[a-zA-Z0-9]*$/).required();
const arrayInput = Joi.array();
const stringAsNumberInput = stringInput.joiCustomStringAsNumber();
const urlInput = Joi.string().uri();
const stringInputAlphabetDigitHyphenUnderscoreSpace = Joi.string().regex(AlphabetDigitHyphenUnderscoreSpace, 'allowded pattern alphabets, digit, hyphen, underscore or space').trim().htmlStrip();
const stringInputAlphabetDigitHyphenUnderscore = Joi.string().regex(AlphabetDigitHyphenUnderscore, 'allowded pattern alphabets, digit, hyphen or underscore').trim().htmlStrip();
const booleanInput = Joi.boolean().strict();
const pagination = Joi.object({
    Page: zeroNumberInput,
    Limit: numberInput,
    SortOrder: Joi.string().uppercase().valid('ASC', 'DESC').options({
        language: {
            any: {
                allowOnly: 'Invalid'
            }
        }
    }),
    SortField: stringInputAlphabetDigitHyphenUnderscore.label('Sort Field')
});
function joiCustomStringAsNumber(joi) {
    return {
        name: 'string',
        base: joi.string(),
        language: {
            joiCustomStringAsNumber: 'must be a valid number'
        },
        rules: [{
                name: 'joiCustomStringAsNumber',
                validate(params, value, state, options) {
                    if (value && !isNaN(value)) {
                        return value;
                    }
                    else {
                        return this.createError('string.joiCustomStringAsNumber', { value }, state, options);
                    }
                }
            }]
    };
}
exports.default = {
    booleanInput: booleanInput,
    numberInput: numberInput,
    stringInput: stringInput,
    anyStringInput: anyStringInput,
    arrayInput: arrayInput,
    zeroNumberInput: zeroNumberInput,
    stringInputAlphabetDigitHyphenUnderscoreSpace: stringInputAlphabetDigitHyphenUnderscoreSpace,
    stringInputAlphabetDigitHyphenUnderscore: stringInputAlphabetDigitHyphenUnderscore,
    logId: numberInput.label('Log Id'),
    userId: stringInput.label('User Id'),
    CreatedBy: stringInput.label('Created By'),
    pagination: pagination,
    stringAsNumberInput: stringAsNumberInput,
    emailInput: emailInput,
    stringInputValidation: stringInputValidation,
    urlInput: urlInput,
    stringValidation: stringValidation,
};
//# sourceMappingURL=joi.custom.js.map