const express = require('express')
const router = express.Router({mergeParams:true});
const { createUser} = require('../controllers/adminUserController');

router.route('/').post(createUser)
module.exports = router