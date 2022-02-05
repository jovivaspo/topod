const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')


const app = express()

//Settings
app.set('port', process.env.PORT || 8001)

//Middleware

app.use(cors())
app.use(express.json())


//Routes
app.use('/api/user', require('../src/routes/user'))
app.use('/api/videos', require('../src/routes/videos'))
app.use('/api/podcasts', require('../src/routes/podcast'))
//Errors
app.use(notFound)
app.use(handleError)


module.exports = app