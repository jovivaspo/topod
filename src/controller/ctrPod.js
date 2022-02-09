
const connection = require('../database')
const mongoose = require('mongoose')
const Users = require('../models/Users')
const PodcastInfo = require('../models/PodcastInfo')


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

        gridFsBucket.find().toArray((err, files) => {

          /*  if (!files || files.length === 0) {
                console.log('no hay archivos')
                const error = new Error('Archivo no existe')
                res.status(404)
                next(error)
                return false
            }*/

          /*  let beauty_files = files.map(file => {
                return {filename:file.filename,
                id:file._id
                }
            })
            console.log(beauty_files)*/
            //return res.json(beauty_files);
        })
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

ctrPod.deletePodcast = async (req, res, next) => {

    try {
        console.log('Borrando')
        const id = req.params.idPodInfo
        const info = await PodcastInfo.findById(id)
        const {userId,podcastId} = info
        console.log(podcastId)
        gridFsBucket.delete( new mongoose.mongo.ObjectId(podcastId),(err)=>{
            console.log(err)
        })

    } catch (err) {
        console.log(err)
    next(err)
}


}


ctrPod.downloadPodcasts = async (req, res, next) => {

    try {

        const id = new mongoose.mongo.ObjectId(req.params.id)

        console.log('Descargando: ', id)

        res.set('content-type', 'audio/mp3')
        res.set('accept-ranges', 'bytes')

        let downloadStream = gridFsBucket.openDownloadStream(id)

        downloadStream.pipe(res)


    } catch (err) {
        next(err)
    }

}

module.exports = ctrPod