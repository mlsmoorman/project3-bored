const express = require('express');
const router = express.Router();
const likesCtrl = require('../../controllers/likes');

router.post('/activities/:id/likes', likesCtrl.create);
router.delete('/likes/:id', likesCtrl.deleteLike);

module.exports = router;