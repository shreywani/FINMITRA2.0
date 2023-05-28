const MutualFund = require('../models/FundData');

const getFilterData = async (req, res) => {
  const {
    exitLoadRange,
    expenseRatioRange,
    sipAmountRange,
    cagrSixMonthsRange,
    cagrOneYearRange,
    cagrThreeYearRange,
    riskFactors,
  } = req.query;

  const query = MutualFund.find();

  // Apply filters based on the query parameters
  
  if (Array.isArray(exitLoadRange) && exitLoadRange.length === 2) {
    const [min, max] = exitLoadRange;
    query.where('exitLoad').gte(parseFloat(min)).lte(parseFloat(max));
  }
  if (expenseRatioRange && Array.isArray(expenseRatioRange) && expenseRatioRange.length === 2) {
    const [min, max] = expenseRatioRange;
    query.where('expenseRatio').gte(parseFloat(min)).lte(parseFloat(max));
  }
  if (sipAmountRange && Array.isArray(sipAmountRange) && sipAmountRange.length === 2) {
    const [min, max] = sipAmountRange;
    query.where('sipMinInvest').gte(parseFloat(min)).lte(parseFloat(max));
  }
  if (cagrSixMonthsRange && Array.isArray(cagrSixMonthsRange) && cagrSixMonthsRange.length === 2) {
    const [min, max] = cagrSixMonthsRange;
    query.where('cagrSixMonths').gte(parseFloat(min)).lte(parseFloat(max));
  }
  if (cagrOneYearRange && Array.isArray(cagrOneYearRange) && cagrOneYearRange.length === 2) {
    const [min, max] = cagrOneYearRange;
    query.where('cagrOneYear').gte(parseFloat(min)).lte(parseFloat(max));
  }
  if (cagrThreeYearRange && Array.isArray(cagrThreeYearRange) && cagrThreeYearRange.length === 2) {
    const [min, max] = cagrThreeYearRange;
    query.where('cagrThreeYear').gte(parseFloat(min)).lte(parseFloat(max));
  }

  try {
    let mutualFunds = await query.limit(10).exec();

    // Filter by risk factors if provided
    // if (riskFactors && Array.isArray(riskFactors) && riskFactors.length > 0) {
    //   mutualFunds = mutualFunds.filter((fund) => {
    //     return riskFactors.every((riskFactor) => fund.riskFactors.includes(riskFactor));
    //   });
    // }

    // Sort by a custom score based on relevance
    mutualFunds.sort((a, b) => {
      const scoreA = calculateScore(a);
      const scoreB = calculateScore(b);
      return scoreB - scoreA;
    });
    const [min, max] = cagrThreeYearRange;
    length =  max; 
    res.json(mutualFunds);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the mutual funds.' });
  }
};

// Calculate a custom score for a mutual fund based on its attributes
const calculateScore = (mutualFund) => {
  // Define the weightage for each attribute
  const weightage = {
    exitLoad: 0.2,
    expenseRatio: 0.3,
    sipMinInvest: 0.2,
    cagrSixMonths: 0.1,
    cagrOneYear: 0.1,
    cagrThreeYear: 0.1,
  };

  // Calculate the weighted sum of attributes
  let score = 0;
  Object.keys(weightage).forEach((attribute) => {
    const value = mutualFund[attribute];
    const attributeScore = (value - attribute.min) / (attribute.max - attribute.min);
    score += attributeScore * weightage[attribute];
  });

  return score;
};

module.exports = { getFilterData };
