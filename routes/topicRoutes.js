const express = require('express')
const router = express.Router({mergeParams:true});
const {getAllTopics,getSingleTopic,createTopic, deleteTopic} = require('../controllers/topicController')
const {protect,restrictTo} = require('../controllers/authController')
const {upload} = require('../utils/upload')

router.route('/').get(getAllTopics).post(upload.single('avatar'),createTopic)
router.route('/:id').delete(deleteTopic)
router.route('/:id').get(getSingleTopic)


module.exports = router