const mongoose = require( 'mongoose'); 

const userSchema  = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    singer:Boolean,
    likedSongs:[
        {  
           
           type: mongoose.Types.ObjectId,
           ref: "Songs",
       
       },
       ],
    
});

module.exports = mongoose.model("users", userSchema);