const Activity = require("../models/activity");

module.exports = {
    create,
    index,
    update
}

async function create(req, res) {
    // ===== Function create - creates an activity within the database based on user selecting an activity =====
    try {
        const activityDoc = await Activity.create({
            user: req.user,
            activity: req.body.activity,
            key: req.body.key,
            type: req.body.type,
            participants: req.body.participants,
            difficulty: req.body.difficulty,
            price: req.body.price,
        })
        const activity = await activityDoc.populate('user');    
        res.status(200).json(activity)
    } catch(err) {
        console.log(err);
        res.json({error: err})
    }
}

async function update(req, res) {
    // ===== Function update - when the user clicks complete, 
    //       this updates complete in the activity model to true =====
    try {
        const updateActivity = await Activity.findOneAndUpdate(
            {_id: req.params.id},
            {completed: true},
            {new: true}
        );
        res.status(200).json(updateActivity)
    } catch(err) {
        console.log(err);
        res.json({error: err})
    }
}

async function index(req, res) {
    // ===== Function index - populates the user for use during fetch calls =====
    try {
        const activities = await Activity.find({}).populate("user").exec();
        res.status(200).json({ activities });
    } catch(err) {
        console.log(err)
        res.json({error: err})
    }
}