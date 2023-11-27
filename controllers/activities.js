const Activity = require("../models/activity");

module.exports = {
    create,
}

async function create(req, res) {
    console.log("req.body==>", req.body, req.user);

    try {
        const activityDoc = await Activity.create({
            // user: req.user,
            // photoUrl: req.user.photoUrl,
            activity: req.body.activity,
            type: req.body.type,
            participants: req.body.participants,
            difficulty: req.body.difficulty,
            price: req.body.price,
        })
        await activityDoc.populate('user');
   
    } catch(err) {
        console.log(err);
    }

}