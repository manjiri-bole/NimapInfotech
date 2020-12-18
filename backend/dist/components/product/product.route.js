"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const product_controller_1 = require("./product.controller");
const routerProduct = express();
const objCtrlProduct = new product_controller_1.default();
routerProduct.post('/add-Product', (req, res) => {
    objCtrlProduct.addProduct(req, res);
});
routerProduct.put('/update-Product', (req, res) => {
    objCtrlProduct.updateProduct(req, res);
});
routerProduct.delete('/delete-Product', (req, res) => {
    objCtrlProduct.deleteProduct(req, res);
});
routerProduct.post('/get-Product-list', (req, res) => {
    objCtrlProduct.getProductList(req, res);
});
exports.default = routerProduct;
//# sourceMappingURL=product.route.js.map