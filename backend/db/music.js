const express = require("express");
// const { Passport, session } = require("passport");
const Song = require("./Song");
const User = require("./User");
const router = express.Router();
const { spawn } = require('child_process');


router.post("/create", async (req,res) =>{
    const {name , thumbnail , track  } = req.body;
    if(!name || !thumbnail || !track ){
      return res.status(401).json("try again");
    }

    const loggedUserId = req.user.id;
    let play = "noone";
    
    const songCreated = await Song.create({name , thumbnail , track , creator: play , artist : loggedUserId}); 
    return res.status(200).json(songCreated);
    
} );

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

router.get("/get/name/:songName" , async (req, res) => {
    const songName = req.params.songName;
    let songs = await Song.find({name: songName}).populate("artist");
    return res.status(200).json(songs);
} );

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





let songsData = [
  {
    name:"Maar Udi",
    thumbnail:"https://pagalfree.com/images/128Maar%20Udi%20-%20Sarfira%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Maar%20Udi%20-%20Sarfira%20128%20Kbps.mp3",
    creator: "Manoj Muntashir, G.V. Prakash Kumar, Yadu Krishnan",
    artist: null,
  },    
  {
    name:"Tu Hai Champion",
    thumbnail:"https://pagalfree.com/images/128Tu%20Hai%20Champion%20-%20Chandu%20Champion%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Tu%20Hai%20Champion%20-%20Chandu%20Champion%20128%20Kbps.mp3",
    creator: "Pritam, Arijit Singh",
    artist: null,
  },    
  {
    name:"Satyanaas",
    thumbnail:"https://pagalfree.com/images/128Satyanaas%20-%20Chandu%20Champion%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Satyanaas%20-%20Chandu%20Champion%20128%20Kbps.mp3",
    creator: "Pritam, Arijit Singh",
    artist: null,
  },    
  {
    name:"Khaali Botal",
    thumbnail:"https://pagalfree.com/images/128Khaali%20Botal%20-%20Manan%20Bhardwaj%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Khaali%20Botal%20-%20Manan%20Bhardwaj%20128%20Kbps.mp3",
    creator: "Manan Bhardwaj, Parampara Tandon",
    artist: null,
  },    
  {
    name:"Khudaya",
    thumbnail:"https://pagalfree.com/images/128Khudaya%20-%20Sarfira%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Khudaya%20-%20Sarfira%20128%20Kbps.mp3",
    creator: "Manoj Muntashir, Suhit Abhyankar",
    artist: null,
  },    
  {
    name:"Angaaron",
    thumbnail:"https://pagalfree.com/images/128Angaaron%20-%20Pushpa%202%20The%20Rule%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Angaaron%20-%20Pushpa%202%20The%20Rule%20128%20Kbps.mp3",
    creator: "Shreya Ghoshal, Devi Sri Prasad",
    artist: null,
  },    
  {
    name:"Agar Ho Tum",
    thumbnail:"https://pagalfree.com/images/128Agar%20Ho%20Tum%20-%20Mr.%20And%20Mrs.%20Mahi%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Agar%20Ho%20Tum%20-%20Mr.%20And%20Mrs.%20Mahi%20128%20Kbps.mp3",
    creator: "Tanishk Bagchi, Kausar Munir",
    artist: null,
  },    
  {
    name:"Pushpa Pushpa",
    thumbnail:"https://pagalfree.com/images/128Pushpa%20Pushpa%20-%20Pushpa%202%20The%20Rule%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Pushpa%20Pushpa%20-%20Pushpa%202%20The%20Rule%20128%20Kbps.mp3",
    creator: "Mika Singh, Nakash Aziz",
    artist: null,
  },    
  {
    name:"Tilasmi Bahein",
    thumbnail:"https://pagalfree.com/images/128Tilasmi%20Bahein%20-%20Heeramandi%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Tilasmi%20Bahein%20-%20Heeramandi%20128%20Kbps.mp3",
    creator: "Sanjay Leela Bhansali,",
    artist: null,
  },    
  {
    name:"Team India Hain Hum",
    thumbnail:"https://pagalfree.com/images/128Team%20India%20Hain%20Hum%20-%20Maidaan%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Team%20India%20Hain%20Hum%20-%20Maidaan%20128%20Kbps.mp3",
    creator: "A.R. Rahman,Nakul Abhyankar",
    artist: null,
  },    
  {
    name:"Ghagra",
    thumbnail:"https://pagalfree.com/images/128Ghagra%20-%20Crew%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Ghagra%20-%20Crew%20128%20Kbps.mp3",
    creator: "Ila Arun, Srushti Tawade",
    artist: null,
  },    
  {
    name:"Halki Halki Si",
    thumbnail:"https://pagalfree.com/images/128Halki%20Halki%20Si%20-%20Asees%20Kaur%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Halki%20Halki%20Si%20-%20Asees%20Kaur%20128%20Kbps.mp3",
    creator: "Asees Kaur, Saaj Bhatt",
    artist: null,
  },    
  {
    name:"Zindagi Tere Naam",
    thumbnail:"https://pagalfree.com/images/128Zindagi%20Tere%20Naam%20-%20Yodha%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Zindagi%20Tere%20Naam%20-%20Yodha%20128%20Kbps.mp3",
    creator: "Vishal Mishra, Kaushal Kishore",
    artist: null,
  },    
  {
    name:"Khushiyaan Bator Lo",
    thumbnail:"https://pagalfree.com/images/128Khushiyaan%20Bator%20Lo%20-%20Shaitaan%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Khushiyaan%20Bator%20Lo%20-%20Shaitaan%20128%20Kbps.mp3",
    creator: "Kumaar, Jubin Nautiyal",
    artist: null,
  },    
  {
    name:"Ishq Jaisa Kuch",
    thumbnail:"https://pagalfree.com/images/128Ishq%20Jaisa%20Kuch%20-%20Fighter%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Ishq%20Jaisa%20Kuch%20-%20Fighter%20128%20Kbps.mp3",
    creator: "Vishal-Sheykhar, Shilpa Rao",
    artist: null,
  },    
  {
    name:"Sher Khul Gaye",
    thumbnail:"https://pagalfree.com/images/128Sher%20Khul%20Gaye%20-%20Fighter%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Sher%20Khul%20Gaye%20-%20Fighter%20128%20Kbps.mp3",
    creator: "Vishal-Sheykhar, Benny Dayal",
    artist: null,
  },    
  {
    name:"Banda",
    thumbnail:"https://pagalfree.com/images/128Banda%20-%20Dunki%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Banda%20-%20Dunki%20128%20Kbps.mp3",
    creator: "Pritam, Diljit Dosanjh, Kumaar",
    artist: null,
  },    
  {
    name:"Nikle The Kabhi Hum Ghar Se",
    thumbnail:"https://pagalfree.com/images/128Nikle%20The%20Kabhi%20Hum%20Ghar%20Se%20-%20Dunki%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Nikle%20The%20Kabhi%20Hum%20Ghar%20Se%20-%20Dunki%20128%20Kbps.mp3",
    creator: "Pritam, Sonu Nigam, Javed Akhtar",
    artist: null,
  },    
  {
    name:"Urvashi",
    thumbnail:"https://pagalfree.com/images/128Urvashi%20-%20Ikka%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Urvashi%20-%20Ikka%20128%20Kbps.mp3",
    creator: "Ikka, MC STAN, Sanjoy",
    artist: null,
  },    
  {
    name:"Meri Ho Ja",
    thumbnail:"https://pagalfree.com/images/128Meri%20Ho%20Ja%20-%20Sachet%20Tandon%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Meri%20Ho%20Ja%20-%20Sachet%20Tandon%20128%20Kbps.mp3",
    creator: "Sachet Tandon, Parampara Tandon, Kumaar",
    artist: null,
  },    
  {
    name:"Ruaan",
    thumbnail:"https://pagalfree.com/images/128Ruaan%20-%20Tiger%203%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Ruaan%20-%20Tiger%203%20128%20Kbps.mp3",
    creator: "Pritam, Arijit Singh, Irshad Kamil",
    artist: null,
  },    
  {
    name:"Abrars Entry Jamal Kudu",
    thumbnail:"https://pagalfree.com/images/128Abrars%20Entry%20Jamal%20Kudu%20-%20Animal%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Abrars%20Entry%20Jamal%20Kudu%20-%20Animal%20128%20Kbps.mp3",
    creator: "Harshavardhan Rameshwar,",
    artist: null,
  },    
  {
    name:"Hua Main",
    thumbnail:"https://pagalfree.com/images/128Hua%20Main%20-%20Animal%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Hua%20Main%20-%20Animal%20128%20Kbps.mp3",
    creator: "Raghav Chaitanya, Manoj Muntashir",
    artist: null,
  },    
  {
    name:"Sooraj Hi Chhaon Banke",
    thumbnail:"https://pagalfree.com/images/128Sooraj%20Hi%20Chhaon%20Banke%20-%20Salaar%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Sooraj%20Hi%20Chhaon%20Banke%20-%20Salaar%20128%20Kbps.mp3",
    creator: "Riya Mukherjee, Ravi Basrur",
    artist: null,
  },    
  {
    name:"Lutt Putt Gaya",
    thumbnail:"https://pagalfree.com/images/128Lutt%20Putt%20Gaya%20-%20Dunki%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Lutt%20Putt%20Gaya%20-%20Dunki%20128%20Kbps.mp3",
    creator: "Pritam, Arijit Singh",
    artist: null,
  },    
  {
    name:"O Maahi",
    thumbnail:"https://pagalfree.com/images/128O%20Maahi%20-%20Dunki%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-O%20Maahi%20-%20Dunki%20128%20Kbps.mp3",
    creator: "Pritam, Arijit Singh,",
    artist: null,
  },    
  {
    name:"Baarish Ke Aane Se",
    thumbnail:"https://pagalfree.com/images/128Baarish%20Ke%20Aane%20Se%20-%20Shreya%20Ghoshal%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Baarish%20Ke%20Aane%20Se%20-%20Shreya%20Ghoshal%20128%20Kbps.mp3",
    creator: "Shreya Ghoshal, Tony Kakkar, Prince Dubey",
    artist: null,
  },    
  {
    name:"Leke Prabhu Ka Naam",
    thumbnail:"https://pagalfree.com/images/128Leke%20Prabhu%20Ka%20Naam%20-%20Tiger%203%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Leke%20Prabhu%20Ka%20Naam%20-%20Tiger%203%20128%20Kbps.mp3",
    creator: "Arijit Singh, Nikhita Gandhi, Pritam",
    artist: null,
  },    
  {
    name:"Kali Kali Zulfon Ke",
    thumbnail:"https://pagalfree.com/images/128Kali%20Kali%20Zulfon%20Ke%20-%20Nusrat%20Fateh%20Ali%20Khan%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Kali%20Kali%20Zulfon%20Ke%20-%20Nusrat%20Fateh%20Ali%20Khan%20128%20Kbps.mp3",
    creator: "Nusrat Fateh Ali Khan, Jubin Nautiyal",
    artist: null,
  },    
  {
    name:"Arjan Vailly Animal",
    thumbnail:"https://pagalfree.com/images/128Arjan%20Vailly%20-%20Animal%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Arjan%20Vailly%20-%20Animal%20128%20Kbps.mp3",
    creator: "Manan Bhardwaj, Bhupinder Babbal",
    artist: null,
  },    
  {
    name:"Papa Meri Jaan",
    thumbnail:"https://pagalfree.com/images/128Papa%20Meri%20Jaan%20-%20Animal%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Papa%20Meri%20Jaan%20-%20Animal%20128%20Kbps.mp3",
    creator: "Sonu Nigam, Harshavardhan Rameshwar",
    artist: null,
  },    
  {
    name:"Gaadi Kaali",
    thumbnail:"https://pagalfree.com/images/128Gaadi%20Kaali%20-%20Neha%20Kakkar%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Gaadi%20Kaali%20-%20Neha%20Kakkar%20128%20Kbps.mp3",
    creator: "Neha Kakkar, Rohanpreet Singh,",
    artist: null,
  },    
  {
    name:"Chaleya",
    thumbnail:"https://pagalfree.com/images/128Chaleya%20-%20Jawan%20128%20Kbps.jpg",
    track:"https://pagalfree.com/musics/128-Chaleya%20-%20Jawan%20128%20Kbps.mp3",
    creator: "Anirudh Ravichander, Arijit Singh",
    artist: null,
  },    

    
];







module.exports = router;


