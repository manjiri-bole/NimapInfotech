import BaseController from "../../shared/controller/BaseController";
import { CategoryInfo, deleteCategory, GetCategoryList } from './category.request.model';
import { ResponseModel } from "../../shared/models/response.model";
import CategoryDBModel from "./category.dbmodel";
import { relative } from "path";

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const objFailureCategory = {
    rows: []
}

class CategoryDBService extends BaseController {
    constructor() {
        super(__filename);

    }



    /**
     * @summary `add new category`
     *
     * @param {Category} Categoryinfo
     * @memberof CategoryDBService
     */
    async getCategoryList() {
        try {
            const objCategory = await CategoryDBModel.findAndCountAll();
            if (objCategory) {
                return this.getResponseObject(objCategory)
            }
            else {
                return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to load list")
            }
        } catch (error) {
            throw new Error(`[FUNCTION: getCategoryList]: ${error.message}`);
        }
    }


    

    /**
     * @summary `add new category`
     *
     * @param {Category} Categoryinfo
     * @memberof CategoryDBService
     */
    async addCategory(objReqBody: CategoryInfo) {
        try {

            const objCategoryExits = await CategoryDBModel.find({
                where: {
                    CategoryName: objReqBody.CategoryName
                }
            })
            if (objCategoryExits) {
                return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FORBIDDEN, `Category ${objCategoryExits.CategoryName} is already exist.`)
            } else {
                const objCategory = await CategoryDBModel.create(objReqBody);
                if (objCategory) {
                    console.log("addkll")
                    return this.getResponseObject(objCategory, true, this.objConstants.HTTP_CODE.SUCCESS, "New category added successfully.")
                } else {
                    return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to add category.")
                }
            }

        } catch (error) {
            throw new Error(`[FUNCTION: addCategory]: ${error.message}`);
        }
    }


    /**
     * @summary `update new category`
     *
     * @param {Category} Categoryinfo
     * @memberof CategoryDBService
     */
    async updateCategory(objReqBody: CategoryInfo) {
        try {
            const objCategoryExits = await CategoryDBModel.find({
                where: {
                    CategoryId: {
                        [Op.ne]: objReqBody.CategoryId
                    },
                    CategoryName: objReqBody.CategoryName
                }
            })
            if (objCategoryExits) {
                return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FORBIDDEN, `Category ${objReqBody.CategoryName} is already exist.`)
            } else {
                const objCategory = await CategoryDBModel.update(objReqBody, {
                    where: {
                        CategoryId: objReqBody.CategoryId
                    }
                })
                if (objCategory) {
                    return this.getResponseObject(objCategory, true, this.objConstants.HTTP_CODE.SUCCESS, "Category update successfully.")
                } else {
                    return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to update category.")
                }
            }
        } catch (error) {
            throw new Error(`[FUNCTION: updateCategory]: ${error.message}`);
        }
    }


    /**
      * @summary `delete new category`
      *
      * @param {Category} Categoryinfo
      * @memberof CategoryDBService
      */
    async deleteCategory(objReqBody: deleteCategory) {
        try {
            const objCategory = await CategoryDBModel.destroy({
                where: {
                    CategoryId: objReqBody.CategoryId
                }
            })
            if (objCategory) {
                return this.getResponseObject(objCategory, true, this.objConstants.HTTP_CODE.SUCCESS, "Category delete succesfully.")
            } else {
                return this.getResponseObject(objFailureCategory, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to delete category.")
            }
        } catch (error) {
            throw new Error(`[FUNCTION: deleteCategory]: ${error.message}`);
        }
    }

}

export default CategoryDBService;












