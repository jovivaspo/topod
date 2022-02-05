const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name:{type: String, required:true},
    email:{type: String, required:true},
    password:{type: String, required:true},
    podcastsList: [{type: Schema.Types.ObjectId,
    ref:'PodcastInfo'}]
})

UserSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
} 

UserSchema.methods.matchPassword = async function(password){
    return bcrypt.compare(password, this.password)
}

UserSchema.set('toJSON',{
    transform:(document, returnObject) =>{
        returnObject.id = returnObject._id,
        delete returnObject.password,
        delete returnObject._id,
        delete returnObject.__v
    }
})

module.exports = model('Users', UserSchema)