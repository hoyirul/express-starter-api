var express = require('express');
var router = express.Router();
const exampleController = require('./../controllers/api/example.controller')

// METHOD : GET 
router.get('/examples/', exampleController.index);
// METHOD : GET 
router.get('/examples/:id', exampleController.show);
// METHOD : POST 
router.post('/examples/', exampleController.store);
// METHOD : PUT
router.put('/examples/:id', exampleController.update);
// METHOD : DELETE
router.delete('/examples/:id', exampleController.destroy);

module.exports = router;