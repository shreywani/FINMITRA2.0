const express = require('express');
const router = express.Router();
const { createFundScore} = require('../controllers/createFundScore');
const { getFundResults } = require('../controllers/getFundResults');

// import controller

router.post ('/createFundScore', createFundScore);
router.get ('/getFundResults', getFundResults);


module.exports = router;