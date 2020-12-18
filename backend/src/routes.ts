import * as express from 'express';
import routerCategory from './components/category/category.route';
import routerProduct from './components/product/product.route';
const router = express();

router.use('/category', routerCategory);
router.use('/product', routerProduct);

module.exports = router;