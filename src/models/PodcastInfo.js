const {Schema, model} = require ('mongoose')

const PodcastInfoSchema = new Schema({

    title:{type: String, required: true},
    userId:{type:Schema.Types.ObjectId,
    ref:'Users'},
    podcastId:{type:Schema.Types.ObjectId, required: true},
    img:{type:String},
    duration:{type:String},
    date:{type:Date, default:new Date}
})

PodcastInfoSchema.set('toJSON',{
    transform:(document, returnObject) =>{
        returnObject.id = returnObject._id,
        delete returnObject._id,
        delete returnObject.__v
    }
})


module.exports = model('PodcastInfo', PodcastInfoSchema )