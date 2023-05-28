const express = require('express');
const router = express.Router();
const { postFundData} = require('../controllers/postFundData');
const { getFundData} = require('../controllers/getFundData');
const { getFilterData } = require('../controllers/getFilterData');


// import controller

router.post ('/postFundData', postFundData);
router.get('/getFundData', getFundData); 
router.get('/getFundFilterData', getFilterData )

module.exports = router;