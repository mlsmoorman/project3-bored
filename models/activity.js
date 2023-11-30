const mongoose = require("mongoose");

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId },
});

const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    activity: String,
    key: Number,
    type: String,
    participants: String,
    difficulty: Number,
    price: Number,
    completed: {
        type : Boolean,
        default: false
    },
    likes: [likesSchema],
    experience: String,
})

module.exports = mongoose.model("Activity", activitySchema);