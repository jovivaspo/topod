const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')
const path = require('path')


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
app.use('/donaciones', require('../src/routes/donaciones'))

//Despliegue

__dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}else{
    app.get('/',(req,res)=>{res.send('Welcome')})
}




//Errors
app.use(notFound)
app.use(handleError)


module.exports = app