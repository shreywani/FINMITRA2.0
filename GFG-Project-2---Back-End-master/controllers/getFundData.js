//import th model
const fundData = require("../models/FundData");

//define route handler

exports.getFundData = async(req,res) => {
    try {
            //fetch all todo items from database
            const funds= await fundData.find({});

            //response
            res.status(200)
            .json({
                success:true,
                data:funds,
                message:"Entire  Data is fetched",
            });
    }
    catch(err) {
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:'Server Error',
        });
       
    }
}
