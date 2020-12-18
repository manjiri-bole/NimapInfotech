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
const category_dbmodel_1 = require("./category.dbmodel");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const objFailureCategory = {
    rows: []
};
class CategoryDBService extends BaseController_1.default {
    constructor() {
        super(__filename);
    }
    /**
     * @summary `add new category`
     *
     * @param {Category} Categoryinfo
     * @memberof CategoryDBService
     */
    getCategoryList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objCategory = yield category_dbmodel_1.default.findAndCountAll();
                if (objCategory) {
                    return this.getResponseObject(objCategory);
                }
                else {
                    return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to load list");
                }
            }
            catch (error) {
                throw new Error(`[FUNCTION: getCategoryList]: ${error.message}`);
            }
        });
    }
    /**
     * @summary `add new category`
     *
     * @param {Category} Categoryinfo
     * @memberof CategoryDBService
     */
    addCategory(objReqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objCategoryExits = yield category_dbmodel_1.default.find({
                    where: {
                        CategoryName: objReqBody.CategoryName
                    }
                });
                if (objCategoryExits) {
                    return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FORBIDDEN, `Category ${objCategoryExits.CategoryName} is already exist.`);
                }
                else {
                    const objCategory = yield category_dbmodel_1.default.create(objReqBody);
                    if (objCategory) {
                        console.log("addkll");
                        return this.getResponseObject(objCategory, true, this.objConstants.HTTP_CODE.SUCCESS, "New category added successfully.");
                    }
                    else {
                        return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to add category.");
                    }
                }
            }
            catch (error) {
                throw new Error(`[FUNCTION: addCategory]: ${error.message}`);
            }
        });
    }
    /**
     * @summary `update new category`
     *
     * @param {Category} Categoryinfo
     * @memberof CategoryDBService
     */
    updateCategory(objReqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objCategoryExits = yield category_dbmodel_1.default.find({
                    where: {
                        CategoryId: {
                            [Op.ne]: objReqBody.CategoryId
                        },
                        CategoryName: objReqBody.CategoryName
                    }
                });
                if (objCategoryExits) {
                    return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FORBIDDEN, `Category ${objReqBody.CategoryName} is already exist.`);
                }
                else {
                    const objCategory = yield category_dbmodel_1.default.update(objReqBody, {
                        where: {
                            CategoryId: objReqBody.CategoryId
                        }
                    });
                    if (objCategory) {
                        return this.getResponseObject(objCategory, true, this.objConstants.HTTP_CODE.SUCCESS, "Category update successfully.");
                    }
                    else {
                        return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to update category.");
                    }
                }
            }
            catch (error) {
                throw new Error(`[FUNCTION: updateCategory]: ${error.message}`);
            }
        });
    }
    /**
      * @summary `delete new category`
      *
      * @param {Category} Categoryinfo
      * @memberof CategoryDBService
      */
    deleteCategory(objReqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objCategory = yield category_dbmodel_1.default.destroy({
                    where: {
                        CategoryId: objReqBody.CategoryId
                    }
                });
                if (objCategory) {
                    return this.getResponseObject(objCategory, true, this.objConstants.HTTP_CODE.SUCCESS, "Category delete succesfully.");
                }
                else {
                    return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to delete category.");
                }
            }
            catch (error) {
                throw new Error(`[FUNCTION: deleteCategory]: ${error.message}`);
            }
        });
    }
}
exports.default = CategoryDBService;
//# sourceMappingURL=category.dbservices.js.map