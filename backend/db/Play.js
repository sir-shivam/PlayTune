
// router.post("/create", async (req,res) => {
//     const loggedUser = req.user;
//     const {name , thumbnail , songs} = req.body;
//     if(!name || !thumbnail){
//     return res.status(400).json("hello");

//     }
//     const playlist = await Playlist.create({name , thumbnail ,owner: req.user.id, songs:songs });
//     return res.status(200).json("playlist");

// } );

const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('./authMiddleware'); 

const Playlist = require('./Playlist'); 

const router = express.Router();

router.post('/create', async (req, res) => {
  const loggedUser = req.user; 
  const { name, thumbnail, songs } = req.body;

  if (!name || !thumbnail) {
    return res.status(400).json({ message: 'Name and thumbnail are required!' });
  }

  try {
   
    const newPlaylist = new Playlist({
      name,
      thumbnail,
      owner: loggedUser._id, 
      songs, 
    });

    
    const savedPlaylist = await newPlaylist.save();

    
    return res.status(201).json({ message: 'Playlist created successfully!', playlist: savedPlaylist });
  } catch (error) {
    console.error('Error creating playlist:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


router.get("/get/list/:playlistId", async (req,res)=> {
    const playlistId = req.params.playlistId;
    // const playlist = await Playlist.findOne({_id: playlistId});
    // return res.status(200).json(playlist);
    console.log("working");
    return res.send(playlistId);
})

router.get("/get/artist/:artistId" , async (req, res )=>{
    // const artId = req.params.artistId;
    // const playlist = await Playlist.find({owner: artId});
    // return res.status(200).json(playlist);
    res.send("working fine..");   
    return  
})


//song adding to a playlist
router.post("/add/song", async (req, res) => {
    const loggedUser = req.user;
    const {playlistId, songId} = req.body;

    const playlist = await Playlist.findOne({_id : playlistId});
    if(!playlistId){
    return res.status(200).json("playlist not  exist");
    }
    let song ;
    if(playlist.owner == loggedUser._id){
         song = await Song.findOne({_id : songId});
    }

    if(!song){
    return res.status(200).json("song not  exist");
    }

    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
})


