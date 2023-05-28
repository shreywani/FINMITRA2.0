const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    companyId:{
        type:Number,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
    }
});

module.exports = mongoose.model("Company", CompanySchema);