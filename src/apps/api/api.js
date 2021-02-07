const router = require('express').Router()

router.use('/user', require('./user/user.routes'))

module.exports = router