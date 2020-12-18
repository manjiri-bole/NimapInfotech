"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../shared/controller/BaseController");
const product_dbmodel_1 = require("./product.dbmodel");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const objFailureProduct = {
    rows: []
};
class ProductDBService extends BaseController_1.default {
    constructor() {
        super(__filename);
    }
    /**
     * @summary `add new Product`
     *
     * @param {Product} Productinfo
     * @memberof ProductDBService
     */
    getProductList(objReqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let queryParams = ``;
                let arrQueryParams = [];
                let orderByParams = ``;
                let paginationParams = ``, hasPage = true, count = 0;
                if ('Pagination' in objReqBody && objReqBody.Pagination) {
                    hasPage = objReqBody.Pagination.Page > 0 ? true : false;
                    if (objReqBody.Pagination.Page >= 0 && objReqBody.Pagination.Limit > 0) {
                        const page = objReqBody.Pagination.Page * objReqBody.Pagination.Limit;
                        paginationParams = ` LIMIT ${page}, ${objReqBody.Pagination.Limit} `;
                    }
                    if ('SortField' in objReqBody.Pagination && objReqBody.Pagination.SortField &&
                        objReqBody.Pagination.SortField.trim() !== '') {
                        orderByParams = ` ORDER BY d.${objReqBody.Pagination.SortField} ${objReqBody.Pagination.SortOrder}`;
                    }
                }
                if (arrQueryParams.length) {
                    queryParams = `WHERE  ${arrQueryParams.join(' AND ')}`;
                }
                const query = `
                SELECT 
	                p.ProductId,p.ProductName,c.CategoryId,c.CategoryName
                from 
                    tblProduct p
                JOIN 
                    tblCategory c ON (c.CategoryId = p.CategoryId)
                ${paginationParams}
                `;
                const queryCount = `
                SELECT 
                    COUNT(*) AS count
                from 
                    tblProduct p
                JOIN 
                    tblCategory c ON (c.CategoryId = p.CategoryId)
                    `;
                const arrProduct = yield this.SequelizeDBInstance.query(query, { type: Sequelize.QueryTypes.SELECT });
                const arrCount = yield this.SequelizeDBInstance.query(queryCount, { type: Sequelize.QueryTypes.SELECT });
                count = arrCount[0].count;
                console.log(arrCount, arrProduct);
                if (Array.isArray(arrProduct) && arrProduct.length) {
                    return this.getResponseObject({
                        count: count,
                        rows: arrProduct
                    });
                }
                else {
                    return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to load roduct list.");
                }
            }
            catch (error) {
                throw new Error(`[FUNCTION: getProductList]: ${error.message}`);
            }
        });
    }
    /**
     * @summary `add new Product`
     *
     * @param {Product} Productinfo
     * @memberof ProductDBService
     */
    addProduct(objReqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objProductExits = yield product_dbmodel_1.default.find({
                    where: {
                        ProductName: objReqBody.ProductName
                    }
                });
                if (objProductExits) {
                    return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FORBIDDEN, `Product ${objProductExits.ProductName} is already exist.`);
                }
                else {
                    const objProduct = yield product_dbmodel_1.default.create(objReqBody);
                    if (objProduct) {
                        console.log("addkll");
                        return this.getResponseObject(objProduct, true, this.objConstants.HTTP_CODE.SUCCESS, "New Product added successfully.");
                    }
                    else {
                        return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to add Product.");
                    }
                }
            }
            catch (error) {
                throw new Error(`[FUNCTION: addProduct]: ${error.message}`);
            }
        });
    }
    /**
     * @summary `update new Product`
     *
     * @param {Product} Productinfo
     * @memberof ProductDBService
     */
    updateProduct(objReqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objProductExits = yield product_dbmodel_1.default.find({
                    where: {
                        ProductId: {
                            [Op.ne]: objReqBody.ProductId
                        },
                        ProductName: objReqBody.ProductName
                    }
                });
                if (objProductExits) {
                    return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FORBIDDEN, `Product ${objReqBody.ProductName} is already exist.`);
                }
                else {
                    const objProduct = yield product_dbmodel_1.default.update(objReqBody, {
                        where: {
                            ProductId: objReqBody.ProductId
                        }
                    });
                    if (objProduct) {
                        return this.getResponseObject(objProduct, true, this.objConstants.HTTP_CODE.SUCCESS, "Product update successfully.");
                    }
                    else {
                        return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to update Product.");
                    }
                }
            }
            catch (error) {
                throw new Error(`[FUNCTION: updateProduct]: ${error.message}`);
            }
        });
    }
    /**
      * @summary `delete new Product`
      *
      * @param {Product} Productinfo
      * @memberof ProductDBService
      */
    deleteProduct(objReqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objProduct = yield product_dbmodel_1.default.destroy({
                    where: {
                        ProductId: objReqBody.ProductId
                    }
                });
                if (objProduct) {
                    return this.getResponseObject(objProduct, false, this.objConstants.HTTP_CODE.SUCCESS, "Product delete succesfully.");
                }
                else {
                    return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to delete Product.");
                }
            }
            catch (error) {
                throw new Error(`[FUNCTION: deleteProduct]: ${error.message}`);
            }
        });
    }
}
exports.default = ProductDBService;
//# sourceMappingURL=product.dbservices.js.map