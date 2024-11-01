const express = require('express')
const router = express.Router()
const User = require('../model/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = "OreWaMonkeyDLuffyKaizokuOuNiNaru"

router.post("/createuser",
  [body('email').isEmail(),
  body('name').isLength({ min: 3 }),
  body('password', 'invalid format').isLength({ min: 8 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let salt= await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password , salt)
    try {
      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Backend error:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

router.post(
  "/loginuser",
  [
    body('email').isEmail(),
    body('password', 'invalid format').isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: "Invalid email" });
      }
      const pwdCompare = await bcrypt.compare(password,user.password) //using bcrypt to check the password with hash value
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Invalid password" });
      }

      const data ={
        user1 :{
          id: user.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret)
      // If the email and password match, you can consider the login successful
      return res.json({ success: true ,authToken:authToken});
    } catch (error) {
      console.error("Backend error:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

module.exports = router; 