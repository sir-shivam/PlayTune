router.post("/create", async (req,res) => {
    // const loggedUser = req.user;
    const {name , thumbnail , songs} = req.body;
    if(!name || !thumbnail || !songs){
    return res.status(400).json("insufficient data");

    }
    const listData = {name , thumbnail , songs , owner: "gupta"};
    const playlist = await Playlist.create(listData);
    return res.status(200).json(playlist);

    // res.send(req.user);
} );

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


