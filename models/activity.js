const mongoose = require("mongoose");

const blogsSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId },
    post: String,
    photoUrl: String
})

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
    blogs: [blogsSchema],
    rating: Number
})

module.exports = mongoose.model("Activity", activitySchema);