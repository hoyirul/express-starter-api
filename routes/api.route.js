var express = require('express');
var router = express.Router();
const { authJwt, verifySignUp } = require("../middlewares");
const authcontroller = require("./../controllers/api/auth.controller");
const exampleController = require('../controllers/api/example.controller');
const categoryController = require('../controllers/api/category.controller');
const productController = require('../controllers/api/product.controller');
const orderController = require('../controllers/api/order.controller');
const userController = require('../controllers/api/user.controller');
const roleController = require('../controllers/api/role.controller');
const differentController = require('../controllers/api/different.controller');

// For auth API
router.post(
  "/auth/signup",
  [
      verifySignUp.checkDuplicateEmail,
      verifySignUp.checkRolesExisted
  ],
  authcontroller.signup
);

router.post("/auth/signin", authcontroller.signin);
router.post("/auth/signout", authJwt.verifyToken, authcontroller.signout);

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

// For Roles API
router.get('/roles', roleController.index);
router.get('/roles/:id', roleController.show);
router.post('/roles/', roleController.store);
router.put('/roles/:id', roleController.update);
router.delete('/roles/:id', roleController.destroy);

// For product API
router.get('/products/by_category', productController.getCountProduct);

// For order API
router.post('/orders', orderController.orderGroupDynamic);
router.get('/ordersall', orderController.orderAll);
router.get('/products/by_order', orderController.getCountProductByOrder);
router.get('/orders/monthly', orderController.getTotalOrderByYear);

// For user API
router.get('/users/all', userController.index);
router.get('/users', userController.paginationTestUsers);

// Test double connect
router.get('/different', differentController.index);
router.post('/different', differentController.store);

module.exports = router;