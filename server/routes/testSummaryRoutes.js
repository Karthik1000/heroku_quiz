var express = require('express');
var router =  express.Router()
const cors = require("cors")
const {createTestSummary,getSummaryofAllTests} = require("../controllers/testSummaryControllers")

router.post("/save-summary",createTestSummary)
router.get('/get-test-summary/:u_email',getSummaryofAllTests)

module.exports = router;