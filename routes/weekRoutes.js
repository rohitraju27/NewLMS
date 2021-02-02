const express = require('express')
const router = express.Router({mergeParams:true});
const {getAllWeeks,createWeek, getSingleWeek} = require('../controllers/weekController')
const {protect,restrictTo} = require('../controllers/authController')
const topicRouter = require('../routes/topicRoutes')

router.use('/:weekId/topics',topicRouter)

router.route('/').get(getAllWeeks).post(createWeek)
// router.route('/:id').get().patch().delete()
router.route('/:id').get(getSingleWeek)

module.exports = router