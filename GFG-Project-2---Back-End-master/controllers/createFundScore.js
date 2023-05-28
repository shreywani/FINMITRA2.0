const fundLeadModel = require("../models/fundLeadsSchema") // Assuming the model file is in a "models" directory

exports.createFundScore=  (req, res) => {
  const { username, email, companyId, fundId, fundScore } = req.body;

  // Update the existing fund score or add a new entry
  fundLeadModel.findOneAndUpdate(
    { username, email, companyId, fundId },
    { fundScore },
    { upsert: true }
  )
    .then(() => {
      res.status(200).json({ message: 'Fund score updated successfully' });
    })
    .catch((error) => {
      console.error('Error updating fund score:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
