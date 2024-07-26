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
    visibilty: {
        type: String,
        enum: ["private", "public"],
        default: "public",
      },
    totaltime: {
        type: Number,
        required: true, 
    },
    isPartyMode: Boolean,
    songs :[
     {  
        
        type: mongoose.Types.ObjectId,
        ref: "Songs",
    
    },
    ],
    expiresAt: { type: Date, default: undefined } ,
});

playlistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { expiresAt: { $exists: true } } });

module.exports = mongoose.model("Playlists", playlistSchema);