const youtube = require('scrape-youtube')
const fs = require('fs')
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

        console.log(search)

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
        const { link, title, userId, img, duration } = req.body
        console.log(link, title, userId, img, duration)
        if (!link || !title || !userId) {
            const error = new Error('Error al realizar la petición')
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
        //video.pipe(fs.createWriteStream(`${title}.mp4`))
        const command = new ffmpeg({ source: video })
            .setFfmpegPath(ffmpegPath)
            .format('mp3')
            .on('stderr', function (stderrLine) {
                console.log('Stderr output: ' + stderrLine);
            })
            .on('error', function (err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message)
            })
            .on('end', function () {
                console.log('Finished processing');
            })
            .pipe(uploadStream, { end: true }) //  fs.createWriteStream(`${title}.mp3`)
            .on('error', () => {
                const error = new Error('Error subiendo el archivo a la BD')
                res.status(500)
                next(error)
            })
            .on('finish', async () => {
                console.log('Archivo subido con éxito id:', idPodcast)
                const podcastInfo = new PodcastInfo({
                    title,
                    userId,
                    podcastId: idPodcast,
                    img,
                    duration
                })
                const podcastInfoSaved = await podcastInfo.save()

                console.log('Info guardada', podcastInfoSaved)

                const user = await Users.findById(userId)

                console.log('Usurario:', user)

                user.podcastsList = user.podcastsList.concat(podcastInfoSaved.id)

                const userSaved = await user.save()

                console.log('Podcast guardado en usuario', userSaved)

                return res.status(201).json({ message: 'Archivo subido con éxito' })

            })





    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = ctrVideos