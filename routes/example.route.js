var express = require('express');
var router = express.Router();
const exampleController = require('./../controllers/api/example.controller')

// METHOD : GET 
router.get('/', exampleController.index);
// METHOD : GET 
router.get('/:id', exampleController.show);
// METHOD : POST 
router.post('/', exampleController.store);
// METHOD : PUT
router.put('/:id', exampleController.update);
// METHOD : DELETE
router.delete('/:id', exampleController.destroy);

module.exports = router;