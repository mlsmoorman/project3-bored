const Activity = require('../models/activity');

module.exports = {
    create,
    deleteLike
}

async function create(req, res) {
    console.log(req.params.id)
    try {
        const activityDoc = await Activity.findById(req.params.id)
        // console.log('activity', activity)
        activityDoc.likes.push({username: req.user.username, userId: req.user._id})
        // console.log('post-push activity===>', activity)
        await activityDoc.save()
        res.status(201).json({data: 'like added'})
    } catch(err) {
        res.status(400).json({err})
    }
}

async function deleteLike(req, res) {
    try{
        const activityDoc = await Activity.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        console.log('this is the activityDoc from DELETE =====>', activityDoc)
        activityDoc.likes.remove(req.params.id)
        
        await post.save()
        res.json({data: 'like removed'})
    } catch(err) {
        res.status(400).json({err})
    }
}