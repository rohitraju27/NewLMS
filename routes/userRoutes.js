const express = require('express')
const router = express.Router();
const {signup} = require('../controllers/authController')

router.post('/signup',signup)

// router.route('/').post(signup)
// router.route('/:id').get().patch().delete()

module.exports = router