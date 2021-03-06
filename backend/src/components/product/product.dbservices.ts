import BaseController from "../../shared/controller/BaseController";
import { ProductInfo, deleteProduct, GetProductList } from './product.request.model';
import { ResponseModel } from "../../shared/models/response.model";
import ProductDBModel from "./product.dbmodel";
import { relative } from "path";

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const objFailureProduct = {
    rows: []
}

class ProductDBService extends BaseController {
    constructor() {
        super(__filename);

    }



    /**
     * @summary `add new Product`
     *
     * @param {Product} Productinfo
     * @memberof ProductDBService
     */
    async getProductList(objReqBody: GetProductList) {
        try {

            let queryParams = ``;
            let arrQueryParams = [];
            let orderByParams = ``;
            let paginationParams = ``, hasPage: boolean = true, count = 0;



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

            const arrProduct = await this.SequelizeDBInstance.query(query, { type: Sequelize.QueryTypes.SELECT });
            const arrCount = await this.SequelizeDBInstance.query(queryCount, { type: Sequelize.QueryTypes.SELECT });
            count = arrCount[0].count;
            console.log(arrCount,arrProduct)
            if (Array.isArray(arrProduct) && arrProduct.length) {
                return this.getResponseObject({
                    count: count,
                    rows: arrProduct
                });
            } else {
                return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to load roduct list.")
            }
        } catch (error) {
            throw new Error(`[FUNCTION: getProductList]: ${error.message}`);
        }
    }


    /**
     * @summary `add new Product`
     *
     * @param {Product} Productinfo
     * @memberof ProductDBService
     */
    async addProduct(objReqBody: ProductInfo) {
        try {

            const objProductExits = await ProductDBModel.find({
                where: {
                    ProductName: objReqBody.ProductName
                }
            })
            if (objProductExits) {
                return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FORBIDDEN, `Product ${objProductExits.ProductName} is already exist.`)
            } else {
                const objProduct = await ProductDBModel.create(objReqBody);
                if (objProduct) {
                    console.log("addkll")
                    return this.getResponseObject(objProduct, true, this.objConstants.HTTP_CODE.SUCCESS, "New Product added successfully.")
                } else {
                    return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to add Product.")
                }
            }

        } catch (error) {
            throw new Error(`[FUNCTION: addProduct]: ${error.message}`);
        }
    }


    /**
     * @summary `update new Product`
     *
     * @param {Product} Productinfo
     * @memberof ProductDBService
     */
    async updateProduct(objReqBody: ProductInfo) {
        try {
            const objProductExits = await ProductDBModel.find({
                where: {
                    ProductId: {
                        [Op.ne]: objReqBody.ProductId
                    },
                    ProductName: objReqBody.ProductName
                }
            })
            if (objProductExits) {
                return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FORBIDDEN, `Product ${objReqBody.ProductName} is already exist.`)
            } else {
                const objProduct = await ProductDBModel.update(objReqBody, {
                    where: {
                        ProductId: objReqBody.ProductId
                    }
                })
                if (objProduct) {
                    return this.getResponseObject(objProduct, true, this.objConstants.HTTP_CODE.SUCCESS, "Product update successfully.")
                } else {
                    return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to update Product.")
                }
            }
        } catch (error) {
            throw new Error(`[FUNCTION: updateProduct]: ${error.message}`);
        }
    }


    /**
      * @summary `delete new Product`
      *
      * @param {Product} Productinfo
      * @memberof ProductDBService
      */
    async deleteProduct(objReqBody: deleteProduct) {
        try {
            const objProduct = await ProductDBModel.destroy({
                where: {
                    ProductId: objReqBody.ProductId
                }
            })
            if (objProduct) {
                return this.getResponseObject(objProduct, false, this.objConstants.HTTP_CODE.SUCCESS, "Product delete succesfully.")
            } else {
                return this.getResponseObject(objFailureProduct, false, this.objConstants.HTTP_CODE.FAILURE, "Failed to delete Product.")
            }
        } catch (error) {
            throw new Error(`[FUNCTION: deleteProduct]: ${error.message}`);
        }
    }

}

export default ProductDBService;












