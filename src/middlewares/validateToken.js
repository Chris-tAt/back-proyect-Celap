import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";

export const authRequire = (req, res, next) => {
    const {token} = req.cookies;
   if (!token) return res.status(401).send({message: "no token, autorizacion denegada"})

   jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({message: 'invalid token'})

    req.decoded = decoded


    next()
   })
    

} 