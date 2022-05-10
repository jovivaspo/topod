const youtube = require('scrape-youtube')
const ytdl = require('ytdl-core')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const connection = require('../database')
const mongoose = require('mongoose')
const PodcastInfo = require('../models/PodcastInfo')
const Users = require('../models/Users')



ctrVideos = {}

ctrVideos.searchVideos = async (req, res, next) => {

    try {
        const search = req.params.search

        //console.log(search)

        const results = await youtube.search(search)

        res.status(200).json(results)
    }

    catch (err) {
        console.log(err)
        next(err)
    }
}


ctrVideos.convertVideo = async (req, res, next) => {
    try {
        console.log('Convirtiendo video');
        const { link, title, userId, img, duration, date } = req.body
       // console.log(link, title, userId, img, duration, date)
        if (!link || !title || !userId) {
            error = new Error('Error al realizar la petición')
            res.status(400)
            next(error)
            return false
        }

        const gridFsBucket = new mongoose.mongo.GridFSBucket(connection, {
            bucketName: 'podcasts',
        });

        let uploadStream = gridFsBucket.openUploadStream(`${title}.mp3`)
        const idPodcast = uploadStream.id;
        const video = ytdl(link)
        let error
        //video.pipe(fs.createWriteStream(`${title}.mp4`))
        const command = new ffmpeg({ source: video })
            .setFfmpegPath(ffmpegPath)
            .format('mp3')
            .on('codecData', function (data) {
                //console.log('Input duration: ', data.duration);
            })
            .on('stderr', function (stderrLine) {
                console.log('Stderr output: ' + stderrLine);
            })
            .on('error', function (err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message)
                error = new Error('Error transformando el archivo')
                next(error)
                return false
            })
            .on('end', function () {
                console.log('Finished processing');
            })
            .pipe(uploadStream, { end: true }) //  fs.createWriteStream(`${title}.mp3`)
            .on('error', () => {
                error = new Error('Error subiendo el archivo a la BD')
                res.status(500)
                next(error)
                return false
            })
            .on('finish', async () => {
                console.log("error: ",error)
                if (!error) {
                   // console.log('Archivo subido con éxito id:', idPodcast)
                    const podcastInfo = new PodcastInfo({
                        title,
                        userId,
                        podcastId: idPodcast,
                        img,
                        duration,
                        date
                    })
                    const podcastInfoSaved = await podcastInfo.save()

                   // console.log('Info guardada', podcastInfoSaved)

                    const user = await Users.findById(userId)

                   // console.log('Usurario:', user)

                    user.podcastsList = user.podcastsList.concat(podcastInfoSaved.id)

                    const userSaved = await user.save()

                    //console.log('Podcast guardado en usuario', userSaved)

                    return res.status(201).json({ message: 'Archivo subido con éxito' })

                }

                return false

            })


    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = ctrVideos