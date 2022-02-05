const {Router} = require("express")
const ctrUser = require ('../controller/ctrUser')

const router = Router()

router.route('/all')
.get(ctrUser.getAll)

router.route('/register')
.post(ctrUser.register)

router.route('/login')
.post(ctrUser.login)


module.exports = router
