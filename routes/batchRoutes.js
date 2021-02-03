const express = require('express')
const router = express.Router();
const {createBatch,getAllBatch,getBatch,updateBatch,deleteBatch} = require('../controllers/batchController')
const {protect, restrictTo} = require('../controllers/authController')
const weekRouter = require('../routes/weekRoutes')
const adminUserRouter = require('../routes/adminUserRoutes')
router.use('/:batchId/admin',adminUserRouter)
router.use('/:batchId/weeks',weekRouter)

router.route('/').get(protect,getAllBatch).post(createBatch)
router.route('/:id').get(getBatch).patch(updateBatch).delete(protect,restrictTo('admin'),deleteBatch)

module.exports = router