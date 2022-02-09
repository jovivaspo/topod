const ctrPod = require('../controller/ctrPod')
const {Router} = require('express')
const protect = require('../middleware/protect')

const router = Router()

router.route('/single/:id')
.get(ctrPod.getPodcasts)

router.route('/download/:id')
.get(protect,ctrPod.downloadPodcasts)

router.route('/delete/:idPodInfo')
.delete(protect, ctrPod.deletePodcast)

router.route('/all/:userId')
.get(protect, ctrPod.getAll)

module.exports = router
