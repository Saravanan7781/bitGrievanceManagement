const express = require('express');
const { showSubmissions } = require('../controllers/submissionsControllers');
const router = express.Router();
const viewSubmissionController = require('../controllers/viewSubmissionController');

router.get('/user/submissions', showSubmissions);
router.get('/user/viewSubmission/:id',viewSubmissionController)

module.exports = router;