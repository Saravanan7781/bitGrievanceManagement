const express = require('express');
const router = express.Router()
const tokenValidator = require('../middlewares/tokenValidator');
const { saveUserWriteForm } = require('../controllers/userWriteFormController');


router.route('/user/submitUserWriteForm').post(saveUserWriteForm);


module.exports = router;