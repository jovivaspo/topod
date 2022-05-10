const mongoose = require('mongoose')

let uriMongoDB

if(process.env.NODE_ENV === "dev"){
  uriMongoDB = process.env.MONGOSE_URL_LOCAL
}else{
    uriMongoDB = process.env.MONGOSE_URL_CLOUD
}

console.log(process.env.NODE_ENV)

mongoose.connect(uriMongoDB,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    
})
const connection = mongoose.connection

connection.once('open',()=>{
    console.log('DB is conected')
})

module.exports = connection

