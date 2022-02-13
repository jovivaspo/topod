const {Router} = require ('express')
const ctrVideos = require ('../controller/ctrVideos')
const protect = require('../middleware/protect')
const limitSpace = require('../middleware/limitSpace')

const router = Router()

router.route('/:search')
.get(ctrVideos.searchVideos)

router.route('/')
.post(protect,limitSpace,ctrVideos.convertVideo)


module.exports = router