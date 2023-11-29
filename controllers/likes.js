const Activity = require('../models/activity');

module.exports = {
    create,
    deleteLike
}

async function create(req, res) {
    console.log(req.params.id)
    try {
        const likeDoc = await Activity.findById(req.params.id)
        // console.log('activity', activity)
        likeDoc.likes.push({username: req.user.username, userId: req.user._id})
        // console.log('post-push activity===>', activity)
        await likeDoc.save()
        res.status(201).json({data: 'like added'})
    } catch(err) {
        res.status(400).json({err})
    }
}

async function deleteLike(req, res) {
    console.log('DELETE ROUTE IS BEING HIT')
    try{
        const likeDoc = await Activity.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        console.log('this is the activityDoc from DELETE =====>', likeDoc)
        likeDoc.likes.remove(req.params.id)
        
        await likeDoc.save()
        res.json({data: 'like removed'})
    } catch(err) {
        console.log(err)
        res.status(400).json({err})
    }
}