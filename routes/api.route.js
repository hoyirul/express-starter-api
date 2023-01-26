var express = require('express');
var router = express.Router();
const exampleController = require('../controllers/api/example.controller');
const categoryController = require('../controllers/api/category.controller');
const productController = require('../controllers/api/product.controller');
const orderController = require('../controllers/api/order.controller');

// METHOD : GET 
router.get('/examples', exampleController.index);
// METHOD : GET 
router.get('/examples/:id', exampleController.show);
// METHOD : POST 
router.post('/examples/', exampleController.store);
// METHOD : PUT
router.put('/examples/:id', exampleController.update);
// METHOD : DELETE
router.delete('/examples/:id', exampleController.destroy);

// For category API
router.get('/categories', categoryController.index);
router.get('/categories/:id', categoryController.show);
router.post('/categories/', categoryController.store);
router.put('/categories/:id', categoryController.update);
router.delete('/categories/:id', categoryController.destroy);

// For product API
router.get('/products/by_category', productController.getCountProduct);

// For order API
router.get('/products/by_order', orderController.getCountProductByOrder);
router.get('/orders/by_year', orderController.getTotalOrderByYear);

module.exports = router;