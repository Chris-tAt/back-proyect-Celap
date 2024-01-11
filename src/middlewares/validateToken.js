import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";

export const authRequire = (req, res, next) => {
    const {token} = req.cookies;
   if (!token) return res.status(401).send({message: "no token, autorizacion denegada"})

   jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({message: 'invalid token'})

    req.user = user


    next()
   })  
};

export const areaMiddleware = async (req, res, next) => {
    const nombreArea = req.params.asignada; // Extraer el nombre del área de la ruta
    const usuario = req.user; // Obtener información del usuario autenticado
    // Verificar si el usuario (paciente) tiene acceso al área específica

    console.log('Nombre del área desde la ruta:', nombreArea);
    console.log('Área asignada al usuario:', usuario.area_asignada);
    if (usuario.area_asignada !== nombreArea) {
        res.status(403).json({ message: 'Acceso no autorizado' });
    } else {
        next(); // Usuario autorizado
    }
};