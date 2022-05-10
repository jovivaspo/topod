const ctrUser = {}
const Users = require('../models/Users')
const jwt = require('jsonwebtoken')

const createToken = (id,email) =>{
    const token = jwt.sign({id,email},process.env.KEY_SECRET)
    return token
}

ctrUser.getAll = async (req, res, next) => {
    const users = await Users.find()
    res.status(200).json(users)
}


ctrUser.register = async (req, res, next) =>{

    try{

        //console.log(req.body)
        const {name, email, password} = req.body

        //console.log(name,email,password);

        const user = await Users.findOne({email})

        if(user){
            const error = new Error('Email en uso')
            res.status(401)
            next(error)
            return false
        }

        const newUser = new Users({
            name,
            email,
            password
        })


        newUser.password = await newUser.encryptPassword(password)


        await newUser.save()

        const token = createToken(newUser.id,newUser.email)

        res.status(201).json({
            message:'Usuario registrado con éxito',
            email: newUser.email,
            userId: newUser.id,
            token
        })

    }catch(err){
        next(err)
    }


}

ctrUser.login = async ( req, res, next ) => {
    
    const {email, password} = req.body

    //console.log(req.body)

    const user = await Users.findOne({email})

    if(!user){
        const error = new Error('Email no registrado')
        res.status(404)
        next(error)
        return false
    }
    const match = await user.matchPassword(password)
    if(!match){
        const error = new Error('Contraseña incorrecta')
        res.status(404)
        next(error)
        return false
    }else{
        const token = createToken(user.id,user.email)
        res.status(200).json({
            message:"Inicio de sesión correcto",
            email:user.email,
            userId:user.id,
            token
        })
    }

}


module.exports = ctrUser