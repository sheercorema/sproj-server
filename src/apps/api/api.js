const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('yeet');
})

router.use('/user', require('./user/user.routes'))

module.exports = router