const express = require('express')
const router = express.Router();
const {signup, login} = require('../controllers/authController');
const { getAllUser } = require('../controllers/userController');

router.post('/signup',signup)
router.post('/login',login)

router.route('/').get(getAllUser)
// router.route('/:id').get().patch().delete()

module.exports = router