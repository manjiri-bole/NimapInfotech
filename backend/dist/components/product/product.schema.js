"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const joi_custom_1 = require("../../shared/validator/joi.custom");
const addProduct = Joi.object({
    CategoryId: joi_custom_1.default.numberInput,
    ProductName: joi_custom_1.default.stringInput
});
const updateProduct = Joi.object({
    ProductId: joi_custom_1.default.numberInput,
    CategoryId: joi_custom_1.default.numberInput.optional(),
    ProductName: joi_custom_1.default.stringInput.optional()
});
const deleteProduct = Joi.object({
    ProductId: joi_custom_1.default.numberInput
});
const getProductList = Joi.object({
    Pagination: joi_custom_1.default.pagination
});
exports.ProductSchema = {
    '/add-product': addProduct,
    '/update-product': updateProduct,
    '/delete-product': deleteProduct,
    '/get=product-list': getProductList
};
//# sourceMappingURL=product.schema.js.map