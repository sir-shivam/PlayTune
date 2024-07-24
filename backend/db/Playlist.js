const mongoose = require( 'mongoose'); 

const playlistSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref:"users",
    },
    totaltime: {
        type: Number,
        required: true, 
    },
    songs :[
     {  
        
        type: mongoose.Types.ObjectId,
        ref: "Songs",
    
    },
    ],
});

module.exports = mongoose.model("Playlists", playlistSchema);