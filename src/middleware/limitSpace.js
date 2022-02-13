const Users = require('../models/Users')

const limitSpace = async (req, res, next) => {
    try {
        const { userId, duration } = req.body

        const user = await Users.findById(userId).populate('podcastsList')

        const list = user.podcastsList

        let totalTime = duration

        list.forEach(el => {
            totalTime += parseInt(el.duration)
        })

        console.log(totalTime)

        if (totalTime > 72000) {
            console.log('Espacio insuficiente, borre algún podcast')
            const error = new Error('Espacio insuficiente, borre algún podcast')
            res.status(401)
            next(error)
        } else {
            next()
        }

    } catch (err) {
        next(err)
    }

}

module.exports = limitSpace