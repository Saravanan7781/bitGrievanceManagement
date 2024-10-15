const express = require("express");
const dashboardCountController = require("../controllers/dashboardCountController");
const router = express.Router();

router.post('/user/adminCount', dashboardCountController)

module.exports = router;