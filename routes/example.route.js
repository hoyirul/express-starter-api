var express = require('express');
var router = express.Router();
const exampleController = require('./../controllers/api/example.controller')

router.get('/', exampleController.index);

router.get('/:id', exampleController.show);

router.post('/', exampleController.store);

router.put('/:id', exampleController.update);

router.delete('/:id', exampleController.destroy);

module.exports = router;