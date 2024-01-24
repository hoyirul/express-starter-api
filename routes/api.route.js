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

// For auth API
router.post(
  "/auth/signup",
  [
    verifySignUp.checkDuplicateEmail,
    // verifySignUp.checkRolesExisted
  ],
  authcontroller.signup
);

router.post("/auth/signin", authcontroller.signin);
router.post("/auth/signout", authJwt.verifyToken, authcontroller.signout);

// METHOD : GET 
router.get('/examples', authJwt.verifyToken, exampleController.index);
// METHOD : GET 
router.get('/examples/:id', authJwt.verifyToken, exampleController.show);
// METHOD : POST 
router.post('/examples/', authJwt.verifyToken, exampleController.store);
// METHOD : PUT
router.put('/examples/:id', authJwt.verifyToken, exampleController.update);
// METHOD : DELETE
router.delete('/examples/:id', authJwt.verifyToken, exampleController.destroy);

// For category API
router.get('/categories', authJwt.verifyToken, categoryController.index);
router.get('/categories/:id', authJwt.verifyToken, categoryController.show);
router.post('/categories/', authJwt.verifyToken, categoryController.store);
router.put('/categories/:id', authJwt.verifyToken, categoryController.update);
router.delete('/categories/:id', authJwt.verifyToken, categoryController.destroy);

// For Roles API
router.get('/roles', authJwt.verifyToken, roleController.index);
router.get('/roles/:id', authJwt.verifyToken, roleController.show);
router.post('/roles/', authJwt.verifyToken, roleController.store);
router.put('/roles/:id', authJwt.verifyToken, roleController.update);
router.delete('/roles/:id', authJwt.verifyToken, roleController.destroy);

// For product API
router.get('/products/by_category', authJwt.verifyToken, productController.getCountProduct);

// For order API
router.post('/orders', authJwt.verifyToken, orderController.orderGroupDynamic);
router.get('/ordersall', authJwt.verifyToken, orderController.orderAll);
router.get('/products/by_order', authJwt.verifyToken, orderController.getCountProductByOrder);
router.get('/orders/monthly', authJwt.verifyToken, orderController.getTotalOrderByYear);

// For user API
router.get('/users/all', authJwt.verifyToken, userController.index);
router.get('/users', authJwt.verifyToken, userController.paginationTestUsers);

module.exports = router;