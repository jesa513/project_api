var express = require('express');
var router = express.Router();
const { customerController } = require('../controllers');

router.get('/datacustomer', customerController.datacustomer)


module.exports = router;