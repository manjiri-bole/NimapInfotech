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
const category_dbservices_1 = require("./category.dbservices");
class CategoryController extends BaseController_1.default {
    constructor() {
        super(__filename);
        this.objDBService = new category_dbservices_1.default();
    }
    /**
     * @summary `Get category list`
     * @param req
     * @param res
    */
    getCategoryList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.objDBService.getCategoryList();
                this.sendResponse(res, result);
            }
            catch (error) {
                this.sendResponse(res, this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
            }
        });
    }
    /**
     * @summary `add new Category`
     * @param req
     * @param res
    */
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.objDBService.addCategory(req.body);
                this.sendResponse(res, result);
            }
            catch (error) {
                this.sendResponse(res, this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.objDBService.updateCategory(req.body);
                this.sendResponse(res, result);
            }
            catch (error) {
                this.sendResponse(res, this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.objDBService.deleteCategory(req.body);
                this.sendResponse(res, result);
            }
            catch (error) {
                this.sendResponse(res, this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
            }
        });
    }
}
exports.default = CategoryController;
//# sourceMappingURL=category.controller.js.map