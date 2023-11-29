const Blog = require('../models/activity');

module.exports = {
    create
}

async function create(req, res) {
    console.log('blog create req.body ==>', req.body, 'blog create req.user ==>', req.user)
    try {
        res.status(201).json({data: 'blog added'})
    } catch(err) {
        res.status(400).json({err})
    }
}