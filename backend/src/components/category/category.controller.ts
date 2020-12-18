import BaseController from "../../shared/controller/BaseController";
import CategoryDBService from "./category.dbservices";
import { ResponseModel } from '../../shared/models/response.model';
import { log } from "util";

class CategoryController extends BaseController {

    objDBService: CategoryDBService;

    constructor() {
        super(__filename);
        this.objDBService = new CategoryDBService();
    }

    /**
     * @summary `Get category list`
     * @param req 
     * @param res 
    */
    async getCategoryList(req, res) {
        try {

            const result: any = <ResponseModel>await this.objDBService.getCategoryList();
            this.sendResponse(res, result);
        } catch (error) {
            this.sendResponse(res, <ResponseModel>this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
        }
    }

    /**
     * @summary `add new Category`
     * @param req 
     * @param res 
    */
    async addCategory(req, res) {
        try {

            const result: any = <ResponseModel>await this.objDBService.addCategory(req.body);
            this.sendResponse(res, result);
        } catch (error) {
            this.sendResponse(res, <ResponseModel>this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
        }
    }

    async updateCategory(req, res) {
        try {

            const result: any = <ResponseModel>await this.objDBService.updateCategory(req.body);
            this.sendResponse(res, result);
        } catch (error) {
            this.sendResponse(res, <ResponseModel>this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
        }
    }


    async deleteCategory(req, res) {
        try {

            const result: any = <ResponseModel>await this.objDBService.deleteCategory(req.body);
            this.sendResponse(res, result);
        } catch (error) {
            this.sendResponse(res, <ResponseModel>this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
        }
    }
}

export default CategoryController;