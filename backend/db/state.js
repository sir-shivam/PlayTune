const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("./User");
const { getToken } = require('../Check/token');



const generateToken = (email, userId) => {
    const secretKey = 'secret_key';
    return jwt.sign({ email, userId }, secretKey); 
  };

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
    
        // Input validation (optional)
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Please provide all required fields (name, email, password).' });
        }

        const newUser = await User.findOne({email: email});
        if (newUser) {
          return res.status(400).json({ message: "user  found" });
        }

          const hashedPassword = await bcrypt.hash(password, 10);
          const newUserData = await User.create({name, email, password: hashedPassword})
          const token = generateToken(email,  newUserData._id); // Replace with appropriate ID field
          const userToReturn = { ...newUserData.toJSON(), token };
          delete userToReturn.password;
          res.status(201).json(userToReturn);

    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }

      
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" }); 
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" }); 
    }
    const token = await generateToken(user.email, user.id || user._id); 

    const userToReturn = { ...user.toJSON(), token }; 
    delete userToReturn.password;
    res.status(200).json(userToReturn);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;


