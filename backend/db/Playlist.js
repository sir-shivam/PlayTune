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
    songs :[
     {
        type: mongoose.Types.ObjectId,
        ref: "songs",
    },
    ],
});

module.exports = mongoose.model("Playlists", playlistSchema);