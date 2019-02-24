var express = require('express');
var router = express.Router();
const { authController } = require('../controllers');

router.post('/register', authController.register)
router.post('/verified', authController.verified)
router.post('/signin', authController.signin)
router.post('/keepsignin', authController.keepsignin)

module.exports = router;