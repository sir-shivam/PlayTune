const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("FriendRequests", friendRequestSchema);
