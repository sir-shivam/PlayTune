const express= require("express");
const cors = require("cors");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const authRoutes = require("./db/state");
const songRoutes = require("./db/music");
const mongoose = require("mongoose");


require("./db/config");
const User = require("./db/User");



const app = express();
app.use(express.json());
app.use(cors());


//Authentication
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret_key"; // Use environment variables for secrets

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    console.log(jwt_payload);
    const user = await User.findOne({_id:jwt_payload.userId}); // Use async/await for clarity
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));


app.get("/view" , async (req,resp) =>{
    
    mongoose.connect("mongodb://localhost:27017/DTune");
    
    const userSchema = new mongoose.Schema({});
    // const User1 = mongoose.model("users", userSchema);
    const data = await User.find();
    console.log(data);
    resp.send(data);
})


app.use("/auth", authRoutes);
app.use("/song", passport.authenticate("jwt", { session: false }),songRoutes);


app.listen(4000);
