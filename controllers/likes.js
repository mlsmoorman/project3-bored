const Activity = require('../models/activity');

module.exports = {
    create,
    deleteLike
}

async function create(req, res) {
    // ===== Function create adds a like to the activity the user clicked on =====
    try {
        // this is looking in the activity model to find the matching ID, adding a like, and saving the update
        const activityDoc = await Activity.findById(req.params.id)
        activityDoc.likes.push({username: req.user.username, userId: req.user._id})
        await activityDoc.save()
        res.status(201).json({data: 'like added'})
    } catch(err) {
        console.log(err)
        res.status(400).json({err})
    }
}

async function deleteLike(req, res) {
    // ===== Function deleteLike allows the logged user to remove a previously liked activity =====
    try{
        // this is looking in the activity model to find the matching ID, removing it and saving the update
        const activityDoc = await Activity.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        activityDoc.likes.remove(req.params.id)
        await activityDoc.save()
        res.json({data: 'like removed'})
    } catch(err) {
        console.log(err)
        res.status(400).json({err})
    }
}