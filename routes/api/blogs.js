const express = require('express');
const router = express.Router();
const blogsCtrl = require('../../controllers/blogs')

router.post('/activities/:id/blogs', blogsCtrl.create)

module.exports = router;