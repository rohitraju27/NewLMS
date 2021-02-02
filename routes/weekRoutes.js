const express = require('express')
const router = express.Router();
const {getAllWeeks,createWeek} = require('../controllers/weekController')
const {protect,restrictTo} = require('../controllers/authController')

router.route('/').get(getAllWeeks).post(protect,restrictTo('admin'),createWeek)
// router.route('/:id').get().patch().delete()

module.exports = router