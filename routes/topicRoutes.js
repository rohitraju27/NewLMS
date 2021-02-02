const express = require('express')
const router = express.Router({mergeParams:true});
const {getAllTopics,getSingleTopic,createTopic} = require('../controllers/topicController')
const {protect,restrictTo} = require('../controllers/authController')

router.route('/').get(getAllTopics).post(createTopic)
// router.route('/:id').get().patch().delete()
router.route('/:id').get(getSingleTopic)

module.exports = router