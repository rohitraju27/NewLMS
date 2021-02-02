const express = require('express')
const router = express.Router();
const {createBatch,getAllBatch,getBatch,updateBatch,deleteBatch} = require('../controllers/batchController')
const {protect, restrictTo} = require('../controllers/authController')
const {createWeek} = require('../controllers/weekController')

router.route('/:batchId/weeks').post(createWeek)

router.route('/').get(protect,getAllBatch).post(createBatch)
router.route('/:id').get(getBatch).patch(updateBatch).delete(protect,restrictTo('admin'),deleteBatch)

module.exports = router