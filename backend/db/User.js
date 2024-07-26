const mongoose = require( 'mongoose'); 

const userSchema  = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    singer: {
        type: Boolean,
        default: false
      },
    friends:[{
        type: mongoose.Types.ObjectId,
           ref: "users",
    }],
    likedSongs:[
        {  
           
           type: mongoose.Types.ObjectId,
           ref: "Songs",
       
       },
       ],
    
});

module.exports = mongoose.model("users", userSchema);