
const connection = require('../database')
const mongoose = require('mongoose')
const Users = require('../models/Users')

const ctrPod = {}

const gridFsBucket = new mongoose.mongo.GridFSBucket(connection, {
    bucketName: 'podcasts',
});

ctrPod.getAll = async (req, res, next) => {

    try {
        const userId = req.params.userId

    
        const user = await Users.findById(userId).populate('podcastsList')

        const list = user.podcastsList

        res.status(200).json(list)

        /*gridFsBucket.find().toArray((err, files) => {

            if (!files || files.length === 0) {
                console.log('no hay archivos')
                const error = new Error('Archivo no existe')
                res.status(404)
                next(error)
                return false
            }

            let beauty_files = files.map(file => {
                return {filename:file.filename,
                id:file._id
                }
            })

            return res.json(beauty_files);
        })*/
    } catch (err) {
        next(err)
    }
}


ctrPod.getPodcasts = async (req, res, next) => {

    try {
        const id = new mongoose.mongo.ObjectId(req.params.id)

        console.log(id)

        res.set('content-type', 'audio/mp3')
        res.set('accept-ranges', 'bytes')

        let downloadStream = gridFsBucket.openDownloadStream(id)
      
        downloadStream.on('data', chunk => {
            res.write(chunk)
        })

        downloadStream.on('error', () => {
            const error = new Error('Error al enviar')
            next(error)
        })
        downloadStream.on('end', () => {
            res.end()
        })


    } catch (err) {
        next(err)
    }

}


module.exports = ctrPod