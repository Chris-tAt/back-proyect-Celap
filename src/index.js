import app from './app.js'
import {connectDB} from './db.js'
// aqui le digo a app que escuche en el puerto 3000 y que muestre un mensaje
connectDB()
app.listen(3000)
console.log('Server on port', 3000)