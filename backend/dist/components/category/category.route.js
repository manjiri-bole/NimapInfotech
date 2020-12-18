"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const category_controller_1 = require("./category.controller");
const routerCategory = express();
const objCtrlCategory = new category_controller_1.default();
routerCategory.post('/add-category', (req, res) => {
    objCtrlCategory.addCategory(req, res);
});
routerCategory.put('/update-category', (req, res) => {
    objCtrlCategory.updateCategory(req, res);
});
routerCategory.delete('/delete-category', (req, res) => {
    objCtrlCategory.deleteCategory(req, res);
});
routerCategory.post('/get-category-list', (req, res) => {
    objCtrlCategory.getCategoryList(req, res);
});
exports.default = routerCategory;
//# sourceMappingURL=category.route.js.map