import Paciente from '../model/paciente.model.js'
import bcrypt from "bcryptjs"
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// con esta funcion estamos creando un usuario, estamos hasheando el password y estamos colocando un jwt

export const register = async (req,res) => {
    const {email, password, username} = req.body
   
    try {
        const userFound = await Paciente.findOne({email})
        if (userFound) return res.status(400).json(['El usuario ya esta en uso'])


       const passwordHash = await bcrypt.hash(password, 10)


        const newPaciente = new Paciente ({
            email, 
            username,
            password: passwordHash 
        })


       const pacienteSave = await newPaciente.save()

       const token = await createAccesToken({id: userSave._id})

        res.cookie('token', token)


        res.json({
            id: pacienteSave._id,
            username: pacienteSave.username,
            email: pacienteSave.email,
            createdAt: pacienteSave.createdAt,
            updatedAt: pacienteSave.updatedAt
        })
    } catch (error) {
       res.status(500).json({message: error.message})
    }
}



export const login = async (req,res) => {
    const {email, password} = req.body
   
    try {
        // comparamos la contraseña con la del usuario de la bd
      const userFound = await User.findOne({email})

      if(!userFound) return res.status(400).json({message: "User not found"})


       const isMatch = await bcrypt.compare(password, userFound.password)

       if(!isMatch) return res.status(400).json({message: "incorrect password"})

       const token = await createAccesToken({id: userFound._id})

        res.cookie('token', token)


        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
       res.status(500).json({message: error.message})
    }
}

export const logout = (req,res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)

}

export const profile = async (req,res) => {
 const userFound = await User.findById(req.decoded.id)
 if(!userFound) return res.status(400).json({message: "User Not found"})

 return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
 })
   res.send('profile')
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "No autorizado"})

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "No autorizado"})

      const userFound = await User.findById(user.id)
      if (!userFound) return res.status(401).json({message: "No autorizado"})

      return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email
      }
      )
    })
}
