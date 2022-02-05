const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    const authorization = req.get('Authorization')

    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        
        token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token, process.env.KEY_SECRET)


    if (!token || !decodedToken.id) {
        const error = new Error('Token invalido')
        res.status(401)
        next(error)
    }else{
        console.log('Token ok')
        next()
    }

   
}

module.exports = protect
