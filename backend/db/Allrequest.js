const express = require('express');
const router = express.Router();
const User = require("./User");
const FriendRequest = require('./FriendRequest');



router.post("/create", async (req, res) => {
    try {
      const loggedUserId = req.user._id;
      const { recId } = req.body;
  
      const existingFriend = await User.findById(loggedUserId).select('friends');
      if (existingFriend.friends.includes(recId)) {
        return res.status(400).json({ message: "User already in your friend list" });
      }
  
      const existingRequest = await FriendRequest.findOne({ sender: loggedUserId, receiver: recId, status: "pending" });
      if (existingRequest) {
        return res.status(400).json({ message: "Friend request already sent" });
      }
  
      const newRequest = await FriendRequest.create({ sender: loggedUserId, receiver: recId, status: "pending" });
  
     
      res.status(200).json({ message: "Sent friend request" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  router.get("/received", async (req, res) => {
    try {
      const loggedUserId = req.user.id;
  
      const requests = await FriendRequest.find({ receiver: loggedUserId, status: "pending" })
        .populate('sender');
      res.status(200).json(requests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  router.get("/checkrequest/byme", async (req, res) => {
    try {
      const loggedUserId = req.user.id;
  
      const requests = await FriendRequest.find({ sender: loggedUserId });
      res.status(200).json(requests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

  router.post('/accept/:requestId', async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const loggedUserId = req.user.id; 
  
      const friendRequest = await FriendRequest.findById(requestId);
      if (!friendRequest) {
        return res.status(404).json({ message: 'Friend request not found' });
      }
  
      if (friendRequest.receiver.toString() !== loggedUserId) {
        return res.status(403).json({ message: 'Unauthorized to accept this request' });
      }
  
      friendRequest.status = 'accepted';
      await friendRequest.save();
  
      const sender = await User.findById(friendRequest.sender);
      const receiver = await User.findById(friendRequest.receiver);
      sender.friends.push(receiver._id);
      receiver.friends.push(sender._id);
      await sender.save();
      await receiver.save();
  
      res.status(200).json({ message: 'Friend request accepted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/reject/:requestId', async (req, res) => {
    try {
      const requestId = req.params.requestId;
      const loggedUserId = req.user.id;
      const friendRequest = await FriendRequest.findById(requestId);
      if (!friendRequest) {
        return res.status(404).json({ message: 'Friend request not found' });
      }
  
      if (friendRequest.receiver.toString() !== loggedUserId) {
        return res.status(403).json({ message: 'Unauthorized to reject this request' });
      }
  
      friendRequest.status = 'rejected';
      await friendRequest.save();
  
      res.status(200).json({ message: 'Friend request rejected' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.get('/friends', async (req, res) => {
    try {
      const userId = req.user.id; 
  
      const user = await User.findById(userId).populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user.friends);
    } catch (err) {
      console.error(err);   
  
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  

module.exports = router;
  