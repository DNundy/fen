const router = require('express').Router()

const AccountRouter = require('./AccountRouter')

router.use('/Index/Account', AccountRouter)

router.use('/*', (req, res) => {
    res.status(404).json('【SERVER ERROR】Interface Not Found !')
})

module.exports = router
