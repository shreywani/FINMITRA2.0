const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
  fundId: {
    type: Number,
    
  },
  companyId: {

    type : Number,
  },
  companyName: {
    type: String,
    
  },
  fundName: {
    type: String,
    
  },
  category: {
    type: String,
    
  },
  benchmark: {
    type: String,
    
  },
  netAssetValue: {
    type: Number,
    
  },
  cagrSixMonths: {
    type: Number,
    
  },
  cagrOneYear: {
    type: Number,
    
  },
  cagrThreeYear: {
    type: Number,
    
  },
  minInvest: {
    type: Number,
    
  },
  expenseRatio: {
    type: Number,
    
  },
  sipMinInvest: {
    type: Number,
    
  },
  exitLoad: {
    type: Number,
    
  },
  riskFactor: {
    type: String,
    
  },
  investmentHorizon: {
    type: Number,
    
  },
});

const Fund = mongoose.model('Fund', fundSchema);

module.exports = Fund;
