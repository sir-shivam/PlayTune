const express = require("express");
// const { Passport, session } = require("passport");
const Song = require("./Song");
const router = express.Router();

router.post("/create", async (req,res) =>{
    const {name , thumbnail , track  } = req.body;
    if(!name || !thumbnail || !track ){
        return res.status(401).json("try again");
    }
    const artist = req.user.id;
    const songCreated = await Song.create({name , thumbnail , track , artist: artist}); 
    return res.status(200).json(songCreated);
    
} );

router.get("/get/mysongs", async (req,res) =>{
    
    const loggedInUser =  req.user
    console.log(loggedInUser._id);
    const songs = await Song.find({artist: loggedInUser.id}).populate("artist");
    return res.status(200).json(songs);

} );


router.get("/get/artist/:artistId", async (req,res) => {
    const {artistId} = req.params.artistId;
    const songs = await Song.find({artist: artistId});
    return res.status(200).json(songs);
});

router.get("/get/name/:songName" , async (req, res) => {
    const {songName} = req.params.songName;
    let songs = await Song.findOne({name: songName});
    return res.status(200).json(songs);
} )


module.exports = router;