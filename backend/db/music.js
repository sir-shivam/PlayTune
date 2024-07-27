const express = require("express");
// const { Passport, session } = require("passport");
const Song = require("./Song");
const User = require("./User");
const router = express.Router();
const { spawn } = require('child_process');


router.post("/creator", async (req, res) => {
  const { name, thumbnail, track, time } = req.body;

  if (!name || !thumbnail || !track || !time) {
    return res.status(400).json({ error: `${name ,thumbnail,track,time}` });
  }

  try {
    const loggedUserId = req.user.id;
    const play = "noone";

    const songCreated = await Song.create({
      name,
      time,
      thumbnail,
      track,
      creator: play,
      artist: loggedUserId
    });

    return res.status(201).json(songCreated);
  } catch (error) {
    console.error("Error creating song:", error);
    return res.status(500).json({ error: "An error occurred while creating the song" });
  }
});



router.post("/insert", async (req,res)=>{
    // res.send("working");

   await Song.insertMany(songsData);
   return res.status(200).json("inserted");
  
})

router.post('/get/update', async (req, res) => {
  try {
    const songsToUpdate = await Song.find({ time: { $exists: false } });

    const updatePromises = songsToUpdate.map(async (song) => {
      const time = await getAudioDuration(song.track); 

      await Song.findByIdAndUpdate(song._id, { time: time });
    });

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Songs updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating songs' });
  }
});


const getAudioDuration = async (track) => {
  return new Promise((resolve, reject) => {
    const ffprobe = spawn('ffprobe', ['-v', 'quiet', '-show_format', '-print_format', 'json', track]);

    let output = '';
    ffprobe.stdout.on('data', (data) => {
      output += data.toString();
    });

    ffprobe.stderr.on('data', (data) => {
      reject(new Error(`Error getting duration: ${data}`));
    });

    ffprobe.on('close', (code) => {
      if (code === 0) {
        try {
          const data = JSON.parse(output);
          const duration = parseFloat(data.format.duration);
          resolve((duration / 60).toFixed(2)); 
        } catch (error) {
          reject(new Error('Error parsing ffprobe output'));
        }
      } else {
        reject(new Error(`ffprobe exited with code: ${code}`));
      }
    });
  });
};


router.post("/get", async (req,res) =>{
    
  
  return res.status(200).json("hello");  
} );


router.get("/get/mylikedsongs", async (req,res) =>{
    
  const loggedUserId = req.user.id;
  const response = await User.findById(loggedUserId).populate("likedSongs");
  return res.status(200).json(response);  
} );


router.get("/get/artist/:artistId", async (req,res) => {
    const {artistId} = req.params.artistId;
    const songs = await Song.find({artist: artistId});
    return res.status(200).json(songs);
});

router.get("/get/name/:songName", async (req, res) => {
  const songName = req.params.songName;
  try {
      const songs = await Song.find({ name: new RegExp(songName, "i") }).populate("artist");
      console.log(songs,"hello");
      return res.status(200).json(songs);
  } catch (error) {
      return res.status(500).json({ message: "Server error", error });
  }
});


router.get("/user/:userName", async (req, res) => {
  const userName = req.params.userName;
  try {
      const users = await User.find({ name: new RegExp(userName, "i") });
      console.log(users,"helloq");

      return res.status(200).json(users);
  } catch (error) {
      return res.status(500).json({ message: "Server error", error });
  }
});



router.get("/get/all" , async (req, res) => {
    let songs = await Song.find().populate("artist");
    return res.status(200).json(songs);
} )

router.post("/like", async (req, res) => {
  const loggedUserId = req.user.id;
  const { songId } = req.body;

  try {
    const song1 = await Song.findOne({ _id: songId });
    const person = await User.findOne({_id : loggedUserId});
    if (!song1) {
      return res.status(404).json("Song not found");
    }

    song1.likes.push(loggedUserId);
    await song1.save();
    person.likedSongs.push(songId);
    await person.save();

    return res.status(200).json(song1);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
});

router.post("/likestatus", async (req, res) => {
  const loggedUserId = req.user.id;
  const { songId } = req.body;

  try {
    const sound = await Song.findOne({ _id: songId });
    if (!sound) {
      return res.status(404).json("Song not found");
    }

    const liked = sound.likes.includes(loggedUserId); 
    if(liked){
      return res.status(200).json("liked");
    }
    else{
      return res.status(200).json("never"); 
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
});

router.post("/unlike", async (req, res) => {
  const loggedUserId = req.user.id;
  const { songId } = req.body;

  try {
    const updatedSong = await Song.findOneAndUpdate(
      { likes: { $in: [loggedUserId] } },
      { $pull: { likes: loggedUserId } } 
    );
    const person = await User.findOneAndUpdate(
      { likedSongs: { $in: [songId] } },
      { $pull: { likedSongs: songId } } 
    );

    if (!updatedSong) {
      return res.status(404).json("Song not found or already unliked"); 
    }

    return res.status(200).json(updatedSong);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal Server Error");
  }
});

router.get("/view" , async (req,resp) =>{
    
  const data = await Song.find();
  resp.send(data);
  
})












module.exports = router;


