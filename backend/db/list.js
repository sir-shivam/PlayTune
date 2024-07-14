const express = require("express");
const Song = require("./Song");
const Playlist = require("./Playlist");
const router = express.Router();

router.post("/create", async (req,res) => {
    const loggedUser = req.user;
    const {name , thumbnail , songs} = req.body;
    if(!name || !thumbnail ){
    return res.status(400).json("change data");

    }
    const playlist = await Playlist.create({name , thumbnail ,  owner: req.user.id, songs :songs});
    return res.status(200).json(playlist);
} );

router.get("/get/byme", async (req,res)=> {
    const playlistId = req.user.id;
    const playlist = await Playlist.find();
    return res.send(playlist);
})


router.get("/get/list/:playlistId", async (req,res)=> {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({_id : playlistId}).populate({
        path:"songs",
        populate:{
            path: "artist",
        }
    });
    // return res.status(200).json(playlist);
    console.log("working");
    return res.send(playlist);
})

router.get("/get/artist/:artistId" , async (req, res )=>{
    const artId = req.params.artistId;
    const playlist = await Playlist.find({owner: artId});
    return res.status(200).json(playlist);
})

const listData = [
    {
      name: "Special",
      thumbnail: "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_640.jpg", 
      owner: null,
      songs: [
        ("66935b5c906699788af2c196"),
        ("66935b5c906699788af2c199"),
      ]
    },
  ];
  

//song adding to a playlist
router.post("/add/song", async (req, res) => {
    const loggedUser = req.user;
    const {playlistId, songId} = req.body;

    const playlist = await Playlist.findOne({_id : playlistId});
    if(!playlistId){
    return res.status(200).json("playlist not  exist");
    }
    let song ;
    // if(playlist.owner == loggedUser._id){
    // }
    song = await Song.findOne({_id : songId});

    if(!song){
    return res.status(200).json("song not  exist");
    }

    playlist.songs.push({hello:songId});
    await playlist.save();
    return res.status(200).json(playlist);
})


router.post("/insert", async (req,res)=>{
    // res.send("working");

   await Playlist.insertMany(listData);
   return res.status(200).json("inserted");
  
})




module.exports = router;

