"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const joi_custom_1 = require("../../shared/validator/joi.custom");
const addCategory = Joi.object({
    CategoryName: joi_custom_1.default.stringInput
});
const updateCategory = Joi.object({
    CategoryId: joi_custom_1.default.numberInput,
    CategoryName: joi_custom_1.default.stringInput
});
const deleteCategory = Joi.object({
    CategoryId: joi_custom_1.default.numberInput
});
const getCategoryList = Joi.object({
    SearchString: joi_custom_1.default.stringInput.optional()
});
exports.CategorySchema = {
    '/add-category': addCategory,
    '/update-category': updateCategory,
    '/delete-category': deleteCategory,
    '/get-category-list': getCategoryList
};
//# sourceMappingURL=category.schema.js.map