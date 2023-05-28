const express = require("express");
const router = express.Router();

const {login, signup} = require("../controllers/Auth");
// const {auth, isStudent,isAdmin} = require("../middlewares/auth");
const authenticate = require("../middleware/authenticate");


router.post("/login", login);
router.post("/signup", signup);

router.get("/protected", authenticate, (req, res) => {
    // Access the authenticated user using req.user
    // console.log(req.user);
    res.json({ success: true, message: 'Protected route', data: req.user});
  });
  

module.exports = router; 