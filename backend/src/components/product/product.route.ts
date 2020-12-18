import * as express from 'express';
import ProductController from './product.controller';
const routerProduct = express();
const objCtrlProduct = new ProductController();

routerProduct.post('/add-Product', (req, res) => {
    objCtrlProduct.addProduct(req, res);
});

routerProduct.put('/update-Product', (req, res) => {
    objCtrlProduct.updateProduct(req, res);
})


routerProduct.delete('/delete-Product',  (req, res) => {
    objCtrlProduct.deleteProduct(req, res);
})

routerProduct.post('/get-Product-list', (req, res) => {
    objCtrlProduct.getProductList(req, res);
})


export default routerProduct;