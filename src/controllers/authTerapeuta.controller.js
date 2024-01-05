import Terapeuta from '../model/terapeuta.model.js'
import bcrypt from "bcryptjs"
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// con esta funcion estamos creando un usuario, estamos hasheando el password y estamos colocando un jwt

export const register = async (req,res) => {
    const {email, password, username} = req.body
   
    try {
        const terapeutaFound = await Terapeuta.findOne({email})
        if (terapeutaFound) return res.status(400).json(['El usuario ya esta en uso'])


       const passwordHash = await bcrypt.hash(password, 10)


        const newTerapeuta = new Terapeuta ({
            email, 
            username,
            password: passwordHash 
        })
        const terapeutaSave = await newTerapeuta.save();
        
       const token = await createAccesToken({id: terapeutaSave._id})

        res.cookie('token', token)


        res.json({
            id: terapeutaSave._id,
            username: terapeutaSave.username,
            email: terapeutaSave.email,
            createdAt: terapeutaSave.createdAt,
            updatedAt: terapeutaSave.updatedAt
        })
    } catch (error) {
       res.status(500).json({message: error.message})
    }
}



export const login = async (req,res) => {
    const {email, password} = req.body
   
    try {
        // comparamos la contraseña con la del usuario de la bd
      const terapeutaFound = await Terapeuta.findOne({email})

      if(!terapeutaFound) return res.status(400).json({message: "Upps parece que tu correo no es el correcto o aún no estas registrado"})


       const isMatch = await bcrypt.compare(password, terapeutaFound.password)

       if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"})

       const token = await createAccesToken({id: terapeutaFound._id})

        res.cookie('token', token)


        res.json({
            id: terapeutaFound._id,
            username: terapeutaFound.username,
            email: terapeutaFound.email,
            createdAt: terapeutaFound.createdAt,
            updatedAt: terapeutaFound.updatedAt
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

export const updateTerapeuta = async (req, res) => {
    try {
      const terapeuta = await Terapeuta.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
     });
     if (!terapeuta) return res.status(404).json({ message: "Terapeuta no funciona" });
     res.json(terapeuta);
    } catch (error) {
     return res.status(404).json({message: "Terapeuta not found"})
    }

   };

export const profile = async (req,res) => {
 const terapeutaFound = await Terapeuta.findById(req.user.id)
 if(!terapeutaFound) return res.status(400).json({message: "User Not found"})

 return res.json({
    id: terapeutaFound._id,
    username: terapeutaFound.username,
    email: terapeutaFound.email,
    createdAt: terapeutaFound.createdAt,
    updatedAt: terapeutaFound.updatedAt
 })
   res.send('profile')
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "No autorizado"})

    jwt.verify(token, TOKEN_SECRET, async (err, terapeuta) => {
        if(err) return res.status(401).json({message: "No autorizado"})

      const terapeutaFound = await Terapeuta.findById(terapeuta.id)
      if (!terapeutaFound) return res.status(401).json({message: "No autorizado"})

      return res.json({
        id: terapeutaFound.id,
        username: terapeutaFound.username,
        email: terapeutaFound.email
      }
      )
    })
}