const express = require('express');
const router = express.Router();
const  {getLeadsCard} = require('../controllers/getLeadsCard');
// import controller


router.get ('/getLeadsCard', getLeadsCard);


module.exports = router;