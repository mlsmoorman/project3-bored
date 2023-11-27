const express = require('express');
const router = express.Router();
const activitiesCtrl = require('../../controllers/activities');

const multer = require ('multer')
const upload = multer();

router.post('/', activitiesCtrl.create);

router.get('/', activitiesCtrl.index);

module.exports = router;