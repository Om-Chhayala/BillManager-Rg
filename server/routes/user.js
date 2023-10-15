const mongoose = require("mongoose");
const express = require('express');
const { User, Bill } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware")
const { authenticateJwt } = require("../middleware");
const { route } = require("./auth");

const router = express.Router();


router.get('/calculate-total', authenticateJwt, async (req, res) => {
  // const userbill = await Bill.find({ userid : req.user.id }); 
  const userid = req.user.id;
    const { units, value } = req.body;
    if (!units || !value) {
      return res.status(400).json({ error: 'Both units and value are required.' });
    }
    const totalAmount = units * value;
    const bill = new Bill({
      units,
      value,
      totalAmount,
      userid
      });
  
    try {
      await bill.save();
  
      res.json({ totalAmount });
    } catch (error) {
      console.error('Error saving bill to the database:', error);
      res.status(500).json({ error: 'Failed to save the bill to the database.' });
    }
  });
  
module.exports = router;