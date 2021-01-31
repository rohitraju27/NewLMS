const express = require('express')
const router = express.Router();
const {} = require('../controllers/userController')

router.route('/').get().post()
router.route('/:id').get().patch().delete()

module.exports = router