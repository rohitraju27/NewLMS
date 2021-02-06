const express = require('express')
const router = express.Router({mergeParams:true});
const {getAllTopics,getSingleTopic,createTopic, deleteTopic,upload} = require('../controllers/topicController')
const {protect,restrictTo} = require('../controllers/authController')

router.route('/').get(getAllTopics).post(upload.array('avatar'),createTopic)
router.route('/:id').delete(deleteTopic)
router.route('/:id').get(getSingleTopic)


module.exports = router