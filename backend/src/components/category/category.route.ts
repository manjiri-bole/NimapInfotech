import * as express from 'express';
import CategoryController from './category.controller';
const routerCategory = express();
const objCtrlCategory = new CategoryController();


routerCategory.post('/add-category',  (req, res) => {
    objCtrlCategory.addCategory(req, res);
});

routerCategory.put('/update-category',  (req, res) => {
    objCtrlCategory.updateCategory(req, res);
})


routerCategory.delete('/delete-category', (req, res) => {
    objCtrlCategory.deleteCategory(req, res);
})

routerCategory.post('/get-category-list', (req, res) => {
    objCtrlCategory.getCategoryList(req, res);
})

export default routerCategory;