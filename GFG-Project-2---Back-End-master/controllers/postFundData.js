const FundData = require('../models/FundData');

exports.postFundData = (req, res) => {
  const {
    FIELD1,
    fundId,
    fundName,
    category,
    benchmark,
    netAssetValue,
    cagrSixMonths,
    cagrOneYear,
    cagrThreeYear,
    minInvest,
    expenseRatio,
    sipMinInvest,
    exitLoad,
    riskFactor,
    investmentHorizon,
    lockinPeriod,
  } = req.body;

  const newFundData = new FundData({
    FIELD1,
    fundId,
    fundName,
    category,
    benchmark,
    netAssetValue,
    cagrSixMonths,
    cagrOneYear,
    cagrThreeYear,
    minInvest,
    expenseRatio,
    sipMinInvest,
    exitLoad,
    riskFactor,
    investmentHorizon,
    lockinPeriod,
  });

  newFundData
    .save()
    .then((savedFundData) => {
      res.status(201).json(savedFundData);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
