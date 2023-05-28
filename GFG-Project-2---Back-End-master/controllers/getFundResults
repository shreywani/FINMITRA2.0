const express = require('express');
const app = express();
const FundLeads = require('../models/fundLeadsSchema');
const FundData = require('../models/FundData');
const _ = require('lodash');

exports.getFundResults = async (req, res) => {
  try {
    const fundIdList = await FundLeads.distinct('fundId');

    const fundData = await FundData.find({ fundId: { $in: fundIdList } })
      .sort({ fundScore: -1 })
      .select('-_id fundId fundName companyId category benchmark netAssetValue cagrSixMonths cagrOneYear cagrThreeYear minInvest expenseRatio sipMinInvest exitLoad riskFactor investmentHorizon lockinPeriod')
      .lean()
      .exec();

    const fundLeads = await FundLeads.find({ fundId: { $in: fundIdList } })
      .select('fundScore fundId username email')
      .lean()
      .exec();

    const mergedData = _.merge(_.keyBy(fundData, 'fundId'), _.keyBy(fundLeads, 'fundId'));
    const responseData = _.values(mergedData)
    const sortedData = _.orderBy(responseData, ['fundScore'], ['desc']);
    
    console.log(sortedData);
    res.json(sortedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
