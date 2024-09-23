const express = require('express');
const router = express.Router()
const loginController = require('../controllers/loginController');
const tokenValidator = require('../middlewares/tokenValidator');


router.route('/user/login').post(loginController);
router.route('/user/current').get(tokenValidator,(req, res) => {
    res.json(req.user);
})

module.exports = router;