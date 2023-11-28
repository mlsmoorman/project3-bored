const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    activity: String,
    type: String,
    participants: String,
    difficulty: Number,
    price: Number,
    completed: {
        type : Boolean,
        default: false
    },
    blog: String,
    rating: Number
})

module.exports = mongoose.model("Activity", activitySchema);