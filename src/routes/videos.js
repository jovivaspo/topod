const {Router} = require ('express')
const ctrVideos = require ('../controller/ctrVideos')
const protect = require('../middleware/protect')

const router = Router()

router.route('/:search')
.get(ctrVideos.searchVideos)

router.route('/')
.post(protect,ctrVideos.convertVideo)


module.exports = router