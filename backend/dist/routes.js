"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const category_route_1 = require("./components/category/category.route");
const product_route_1 = require("./components/product/product.route");
const router = express();
router.use('/category', category_route_1.default);
router.use('/product', product_route_1.default);
module.exports = router;
//# sourceMappingURL=routes.js.map