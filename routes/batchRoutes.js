const express = require('express')
const router = express.Router();
const {createBatch,getAllBatch,getBatch,updateBatch,deleteBatch} = require('../controllers/batchController')
const {protect} = require('../controllers/authController')

router.route('/').get(protect,getAllBatch).post(createBatch)
router.route('/:id').get(getBatch).patch(updateBatch).delete(deleteBatch)

module.exports = router