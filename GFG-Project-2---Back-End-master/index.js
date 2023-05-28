


const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors()) ;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const fs = require('fs');
const bodyParser = require('body-parser');






//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());

//import routes for TODO API
const todoRoutes = require("./routes/todos");
const fundScoreRoutes = require("./routes/FundScore");
const FunddataRoutes = require("./routes/FundDataRoute");
const userRoute = require("./routes/user");
const companyRoutes = require("./routes/CompanyRoutes");
const lead = require("./routes/Leads");


//mount the todo API routes
app.use("/api/v1", todoRoutes);
app.use("/api/v1", fundScoreRoutes);
app.use("/api/v1", FunddataRoutes)
app.use("/api/v1" , userRoute)
app.use("/api/v1" , companyRoutes)
app.use("/api/v1" , lead)



// app.post('/api/updateFundScore', (req, res) => {
//     const { fundScore, fundId, userId} = req.body;
  
//     // Read the existing data from the JSON file
//     const data = fs.readFileSync('fundScores.json');
//     const fundScores = JSON.parse(data);
  
//     // Find the index of the fund score to update or add a new entry
//     const index = fundScores.findIndex(
//       (score) => score.userId === userId && score.fundId === fundId
//     );


//     if (index !== -1) {
//       // Update the existing fund score
//       fundScores[index].fundScore = fundScore;
//       res.status(200).json({ message: 'Fund score updated successfully' });
//     } 
    
//     else {
//       // Add a new fund score entry
//       fundScores.push({ userId, fundId, fundScore });
    
//       // Write the updated data back to the JSON file
//       res.status(200).json({ message: 'Fund score added successfully' });
//     }
   
//       // Add a new fund score entry
      
    
  
//     // Write the updated data back to the JSON file
//     fs.writeFileSync('fundScores.json', JSON.stringify(fundScores));
  
//     res.status(200).json({ message: 'Fund score updated successfully' });
  
     
//   });


//start server
app.listen(4000, () => {
    console.log(`Server started successfully at ${PORT}`);
})

//connect to the database
const dbConnect = require("./config/database");
dbConnect();

//default Route
app.get("/", (req,res) => {
    res.send(`<h1> This is HOMEPAGE baby</h1>`);
})