const {Router} = require('express')
const ctrPay = require('../controller/ctrPay')

const router = Router()

router.route('/')
.post(ctrPay.donaciones)

module.exports = router