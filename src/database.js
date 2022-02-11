const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOSE_URL_CLOUD,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    
})
const connection = mongoose.connection

connection.once('open',()=>{
    console.log('DB is conected')
})

module.exports = connection

