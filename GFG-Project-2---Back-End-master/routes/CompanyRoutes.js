const express = require("express");
const router = express.Router();

const {logincompany, signupcompany} = require("../controllers/AuthCompany");
// const {auth, isStudent,isAdmin} = require("../middlewares/auth");
const authenticateCompany = require("../middleware/authenticateCompany");


router.post("/logincompany", logincompany);
router.post("/signupcompany", signupcompany);

router.get("/protectedCompany", authenticateCompany, (req, res) => {
    // Access the authenticated user using req.user
    // console.log(req.user);
    res.json({ success: true, message: 'Protected route', data: req.user});
  });
  

module.exports = router; 