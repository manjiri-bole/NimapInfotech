import BaseController from "../../shared/controller/BaseController";
import ProductDBService from "./product.dbservices";
import { ResponseModel } from '../../shared/models/response.model';
import { log } from "util";

class ProductController extends BaseController {

    objDBService: ProductDBService;

    constructor() {
        super(__filename);
        this.objDBService = new ProductDBService();
    }

    /**
     * @summary `Get Product list`
     * @param req 
     * @param res 
    */
    async getProductList(req, res) {
        try {

            const result: any = <ResponseModel><unknown>await this.objDBService.getProductList(req.body);
            this.sendResponse(res, result);
        } catch (error) {
            this.sendResponse(res, <ResponseModel>this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
        }
    }

    /**
     * @summary `add new Product`
     * @param req 
     * @param res 
    */
    async addProduct(req, res) {
        try {

            const result: any = <ResponseModel>await this.objDBService.addProduct(req.body);
            this.sendResponse(res, result);
        } catch (error) {
            this.sendResponse(res, <ResponseModel>this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
        }
    }

    async updateProduct(req, res) {
        try {

            const result: any = <ResponseModel>await this.objDBService.updateProduct(req.body);
            this.sendResponse(res, result);
        } catch (error) {
            this.sendResponse(res, <ResponseModel>this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
        }
    }

    async deleteProduct(req, res) {
        try {

            const result: any = <ResponseModel>await this.objDBService.deleteProduct(req.body);
            this.sendResponse(res, result);
        } catch (error) {
            this.sendResponse(res, <ResponseModel>this.getResponseObject({}, false, this.objConstants.HTTP_CODE.FAILURE, error.message));
        }
    }
}

export default ProductController;