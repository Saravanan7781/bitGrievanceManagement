const express = require('express');
const { showSubmissions } = require('../controllers/submissionsControllers');
const router = express.Router();
const viewSubmissionController = require('../controllers/viewSubmissionController');
const submissionApproval = require('../controllers/submissionApprovalController');

router.post('/user/submissions', showSubmissions);
router.get('/user/viewSubmission/:id', viewSubmissionController)        
router.get('/user/submissions/submissionApproval/:id', submissionApproval);

module.exports = router;