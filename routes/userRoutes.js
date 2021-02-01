const express = require('express')
const router = express.Router();
const {signup, login, resetPassword,forgotPassword} = require('../controllers/authController');
const { getAllUser } = require('../controllers/userController');

router.post('/signup',signup)
router.post('/login',login)

router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword/:token',resetPassword)

router.route('/').get(getAllUser)
// router.route('/:id').get().patch().delete()

module.exports = router