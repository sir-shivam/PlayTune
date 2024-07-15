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

router.get("/get/all", async (req,res)=> {
    const playlistId = req.user.id;
    const playlist = await Playlist.find();
    return res.send(playlist);
})

router.get("/get/byme", async (req,res)=> {
    const playlistId = req.user.id;
    const playlist = await Playlist.find({ owner: playlistId });
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



//song adding to a playlist
router.post("/add/song", async (req, res) => {
    const loggedUser = req.user;
    const {playlistId, songId} = req.body;

    const playlist = await Playlist.findOne({_id : playlistId});
    if(!playlistId){
    return res.status(200).json("playlist not  exist");
    }
    

    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json(playlist);
})


router.post("/insert", async (req,res)=>{
    // res.send("working");

   await Playlist.insertMany(listData);
   return res.status(200).json("inserted");
  
});

const listData = [
    {
      name: "Midnight Musings",
      thumbnail: "https://images.unsplash.com/photo-1718554517780-b9ca6513c4c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2Nnx8fGVufDB8fHx8fA%3D%3D", 
      owner: null,
      songs: [
        ("66952308556869af295d48ce"),
        ("66952308556869af295d48cf"),
        ("66952308556869af295d48d2"),
        ("66952308556869af295d48d5"),
        ("66952308556869af295d48d8"),
        ("66952308556869af295d48de"),
        ("66952308556869af295d48e0"),
        ("6694f2733de99812f61a415d"),
        ("6694f2733de99812f61a4160"),
        ("6694f2733de99812f61a4161"),
        ("6694f2733de99812f61a4164"),
        ("66951762f4af8794d934a40e"),
        ("66951762f4af8794d934a412"),
        ("66951762f4af8794d934a414"),
        ("66951762f4af8794d934a416"),

      ]
    },
  ];
  




module.exports = router;

