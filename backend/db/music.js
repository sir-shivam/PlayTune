const express = require("express");
// const { Passport, session } = require("passport");
const Song = require("./Song");
const router = express.Router();

router.post("/create", async (req,res) =>{

    const {name , thumbnail , track , artist } = req.body;
    if(!name || !thumbnail || !track || !artist){
        return res.status(401).json("try again");
    }
    // // const artist = req.user._id;
    const songCreated = await Song.create({name , thumbnail , track, artist}); 
    return res.status(200).json(songCreated);
    
} );

router.get("/get/mysongs", async (req,res) =>{
    
    // const loggedInUser =  req.user;
    const {artist }=  req.body;
    const songs = await Song.findOne({artist: artist});
    return res.status(200).json(songs);

} );



module.exports = router;