const handleError = (error, req, res, next) =>{
    const statusCode = error.status === 200? 500 : res.statusCode
    res.status(statusCode).json({error:error.message})
}

module.exports = handleError