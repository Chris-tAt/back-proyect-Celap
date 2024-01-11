import Paciente from '../model/paciente.model.js'
import Area from '../model/area.model.js'
import bcrypt from "bcryptjs"
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

// con esta funcion estamos creando un usuario, estamos hasheando el password y estamos colocando un jwt

export const register = async (req,res) => {
    const {email, password, username, area_asignada} = req.body
   
    try {
        const pacienteFound = await Paciente.findOne({email})
        if (pacienteFound) return res.status(400).json(['El usuario ya esta en uso'])


       const passwordHash = await bcrypt.hash(password, 10)


        const newPaciente = new Paciente ({
            email, 
            username,
            password: passwordHash,
            area_asignada,

        })


       const pacienteSave = await newPaciente.save()

       const token = await createAccesToken({id: pacienteSave._id, area_asignada: pacienteSave.area_asignada})

        res.cookie('token', token)


        res.json({
            id: pacienteSave._id,
            username: pacienteSave.username,
            email: pacienteSave.email,
            area_asignada: pacienteSave.area_asignada,
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
      const pacienteFound = await Paciente.findOne({email})

      if(!pacienteFound) return res.status(400).json({message: "Upps parece que tu correo no es el correcto o aún no estas registrado"})


       const isMatch = await bcrypt.compare(password, pacienteFound.password)

       if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"})

       const area = await Area.findOne({ _id: pacienteFound.area_asignada });

       const token = await createAccesToken({
        id: pacienteFound._id,
        area_asignada: area ? area.nombre : null
    });
        res.cookie('token', token)


        res.json({
            id: pacienteFound._id,
            username: pacienteFound.username,
            email: pacienteFound.email,
            area_asignada: area ? area.nombre : null,
            createdAt: pacienteFound.createdAt,
            updatedAt: pacienteFound.updatedAt
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
 const pacienteFound = await Paciente.findById(req.user.id)
 if(!pacienteFound) return res.status(400).json({message: "User Not found"})

 return res.json({
    id: pacienteFound._id,
    username: pacienteFound.username,
    email: pacienteFound.email,
    createdAt: pacienteFound.createdAt,
    updatedAt: pacienteFound.updatedAt
 })
   res.send('profile')
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "No autorizado"})

    jwt.verify(token, TOKEN_SECRET, async (err, paciente) => {
        if(err) return res.status(401).json({message: "No autorizado"})

      const pacienteFound = await Paciente.findById(paciente.id)
      if (!pacienteFound) return res.status(401).json({message: "No autorizado"})

      return res.json({
        id: pacienteFound.id,
        username: pacienteFound.username,
        email: pacienteFound.email,

      }
      )
    })
}
