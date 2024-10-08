const express = require('express');
const app = express();
const cors = require('cors');
const  database= require('../Models/registerM.js');
const router = express.Router();
app.use(cors());
app.use(express.json());

router.post('/', (req, res) => {
  const { Marks, Precentile, Cast } = req.body;
  const registration = new database({ Marks, Precentile, Cast });
  registration.save((err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('Registration successful!');
    }
  });
});

module.exports = router;
