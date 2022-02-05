const ctrPod = require('../controller/ctrPod')
const {Router} = require('express')
const protect = require('../middleware/protect')

const router = Router()

router.route('/single/:id')
.get(protect, ctrPod.getPodcasts)

router.route('/all/:userId')
.get(protect, ctrPod.getAll)

module.exports = router
