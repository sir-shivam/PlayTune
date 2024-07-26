const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("./User");
const FriendRequest = require('./FriendRequest');


const generateToken = (email, userId) => {
    const secretKey = 'secret_key';
    return jwt.sign({ email, userId }, secretKey); 
  };

router.post('/register', async (req, res) => {
    try {
        const { name, email, password , singer } = req.body;
    
        // Input validation (optional)
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Please provide all required fields (name, email, password)',err: "error" });
        }

        const newUser = await User.findOne({email: email});
        if (newUser) {
          return res.status(403).json({ message: "user already registered with this Email", err: "error" });
        }

          const hashedPassword = await bcrypt.hash(password, 10);
          const newUserData = await User.create({name, email, singer ,password: hashedPassword  })
          const token = generateToken(email,  newUserData._id); 
          const userToReturn = { ...newUserData.toJSON(), token };
          delete userToReturn.password;
          console.log(userToReturn);
          res.status(201).json(userToReturn);

    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' , err: "error"});
      }
});



router.post('/delta/login', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(name, email, password);

        const newUser = await User.findOne({email: email});
        if (!newUser) {
          
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUserData = await User.create({name, email, password: hashedPassword})
          const token = generateToken(email,  newUserData._id); 
          const userToReturn = { ...newUserData.toJSON(), token };
          delete userToReturn.password;
          console.log(userToReturn);
          res.status(201).json(userToReturn.token);
          
        }
        else{
        const token = await generateToken(newUser.email, newUser.id || newUser._id); 
        const userToReturn = { ...newUser.toJSON(), token }; 
        delete userToReturn.password;
        res.status(200).json(userToReturn.token);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' , err: "error"});
      }
});





router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" ,
        err: "error"
      }); 
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password",
        err: "error"
       }); 
    }
    const token = await generateToken(user.email, user.id || user._id); 

    const userToReturn = { ...user.toJSON(), token }; 
    delete userToReturn.password;
    res.status(200).json(userToReturn);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" ,err: "error"});
  }
});


router.get("/user/all", async (req, res) => {

  try {
    let alluser = await User.find();
    res.status(200).json(alluser);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" ,err: "error"});
  }
});


module.exports = router;


