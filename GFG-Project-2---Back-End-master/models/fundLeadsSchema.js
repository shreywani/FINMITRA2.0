const mongoose = require('mongoose');

const fundScoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  fundId: {
    type: Number,
    required: true,
  },
  fundScore: {
    type: Number,
    required: true,
  },
});

const FundScore = mongoose.model('FundScore', fundScoreSchema);

module.exports = FundScore;
