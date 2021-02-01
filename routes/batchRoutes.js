const express = require('express')
const router = express.Router();
const {createBatch,getAllBatch,getBatch,updateBatch,deleteBatch} = require('../controllers/batchController')
const {protect, restrictTo} = require('../controllers/authController')

router.route('/').get(protect,getAllBatch).post(createBatch)
router.route('/:id').get(getBatch).patch(updateBatch).delete(protect,restrictTo('admin'),deleteBatch)

module.exports = router