const ytdl = require('ytdl-core')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const connection = require('../database')
const mongoose = require('mongoose')
const PodcastInfo = require('../models/PodcastInfo')
const Users = require('../models/Users')

const convertVideo = (video, socket) => {
    console.log('Vamos a convertir el video')
    const gridFsBucket = new mongoose.mongo.GridFSBucket(connection, {
        bucketName: 'podcasts',
    });

    let uploadStream = gridFsBucket.openUploadStream(`${video.title}.mp3`)
    const idPodcast = uploadStream.id;
    const videoStream = ytdl(video.link)
    let error

    const command = new ffmpeg({ source: videoStream })
            .setFfmpegPath(ffmpegPath)
            .format('mp3')
            .on('codecData', function (data) {
                console.log('Input duration: ', data.duration);
            })
            .on('stderr', function (stderrLine) {
                //console.log('Stderr output: ' + stderrLine);
                if(stderrLine.includes('size') && stderrLine.includes('time')){
                    const index = stderrLine.search(/time=/)
                   // console.log(index)
                    const time = stderrLine.substring(index+5,index+5+8)
                    console.log(video.duration)
                    const hours = parseInt(time.substring(0,2))*360
                    const minutes = parseInt(time.substring(3,5))*60
                    const seconds = parseInt(time.substring(6,8))
                    const progress = hours + minutes + seconds
                    const progressTotal = progress / video.duration
                    console.log('Convirtiendo...', progressTotal.toFixed(2) *100 + '%')
                    socket.emit('converting_progress', progressTotal.toFixed(2)*100 )
                }

               
            })
            .on('error', function (err) {
                console.log('Cannot process video: ' + err.message)
                error = new Error(`Error conviertiendo el archivo: ${err.message}`)
                socket.emit('error', error.message )
                return false
            })
            .on('end', function () {
                console.log('Finished processing');
            })
            .pipe(uploadStream, { end: true }) //  fs.createWriteStream(`${title}.mp3`)
            .on('error', () => {
                error = new Error('Error subiendo el archivo a la BD')
                socket.emit('error', 'Error subiendo archivo  el archivo')
                return false
            })
            .on('finish', async () => {
                
                if (!error) {
                    console.log('Archivo subido con éxito id:', idPodcast)
                    const podcastInfo = new PodcastInfo({
                        title: video.title,
                        userId: socket.decoded.id,
                        podcastId: idPodcast,
                        img: video.thumbnail,
                        duration: video.duration,
                        date: new Date
                    })
                    const podcastInfoSaved = await podcastInfo.save()

                    console.log('Info guardada', podcastInfoSaved)

                    const user = await Users.findById(socket.decoded.id)

                    console.log('Usurario:', user)

                    user.podcastsList = user.podcastsList.concat(podcastInfoSaved.id)

                    const userSaved = await user.save()

                    console.log('Podcast guardado en usuario', userSaved)

                   socket.emit('finish', 'Video convertido con éxito')

                }

                return false

            })
}

module.exports = convertVideo