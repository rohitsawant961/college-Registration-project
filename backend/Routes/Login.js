const express = require('express');
const { signupValidation, loginValidation} = require('../Middlewares/shreyVal');
const { signup, login} = require('../Controllers/Authcontrol');
const router = express.Router();
const app = express();
const cors = require('cors');
const  database= require('../Models/registerM.js');
app.use(cors());
app.use(express.json());



router.post("/login",loginValidation,login)
router.post("/signup",signupValidation, signup)
router.post('/register', async (req, res) => { // Add async keyword
    try {
      const { Marks, Percentile, Cast } = req.body;
      const registration = new database({ Marks, Percentile, Cast });
  
      // Use async/await or .then().catch() to handle the Promise
      await registration.save(); // Use await to wait for the save operation
  
      res.status(201).json({ success: true, message: 'Registration successful!' }); 
  } catch (err) {
    console.error(err); 
    res.status(500).json({ success: false, message: 'Registration failed!' });
  }
});


module.exports = router;