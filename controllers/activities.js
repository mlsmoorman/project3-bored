const Activity = require("../models/activity");

module.exports = {
    create,
    index,
}

async function create(req, res) {
    console.log("req.body==>", req.body, req.user);

    try {
        const activityDoc = await Activity.create({
            user: req.user,
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

async function index(req, res) {
    try {
        const activities = await Activity.find({}).populate("user").exec();
        res.status(200).json({ activities });
    } catch(err) {
        res.json({error: err})
    }
}