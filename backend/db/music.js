const express = require("express");
// const { Passport, session } = require("passport");
const Song = require("./Song");
const router = express.Router();

router.post("/create", async (req,res) =>{
    const {name , thumbnail , track , artist  } = req.body;
    if(!name || !thumbnail || !track ){
        return res.status(401).json("try again");
    }
    let artist1 = artist;
    if(!artist){
        artist1 = req.user.id;
    }
    
    const songCreated = await Song.create({name , thumbnail , track , artist: artist1}); 
    return res.status(200).json(songCreated);
    
} );

router.post("/insert", async (req,res)=>{
    res.send("working");

  //  await Song.insertMany(songsData);
  //  return res.status(200).json("inserted");
  
})



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
    const songName = req.params.songName;
    let songs = await Song.find({name: songName}).populate("artist");
    return res.status(200).json(songs);
} )






module.exports = router;


  