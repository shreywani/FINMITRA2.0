const express = require('express');
const app = express();
const FundLeads = require('../models/fundLeadsSchema');
const FundData = require('../models/FundData');
const _ = require('lodash');

exports.getLeadsCard = async (req, res) => {
  try {
    const companyId = req.query.companyId;

    const fundLeads = await FundLeads.find({ companyId: companyId })
      .select('fundId fundScore username email')
      .lean()
      .exec();

    const fundIds = fundLeads.map((lead) => lead.fundId);
    
    const fundData = await FundData.find({ fundId: { $in: fundIds } })
      .lean()
      .exec();

    const mergedData = fundLeads.map((lead) => {
      const fund = fundData.find((data) => data.fundId === lead.fundId);
      return {
        fundId: lead.fundId,
        fundScore: lead.fundScore,
        username: lead.username,
        email: lead.email,
        ...fund
      };
    });
    console.log(mergedData);
    res.json(mergedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
