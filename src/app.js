import express from 'express'
import morgan from 'morgan'
import authPacienteRoutes from './routes/authPaciente.routes.js'
import authTerapeutaRoutes from './routes/authTerapeuta.routes.js'
import areaRoutes from "./routes/area.routes.js";
// import tasksRoutes  from "./routes/tasks.routes.js";
import cookieParser from 'cookie-parser'
// import cors from "cors";
// este app es basicamente el servidor
const app = express();
// app.use(cors(
//     {origin: 'http://localhost:5173',
// credentials:true}
// )),
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authPacienteRoutes);
app.use('/api', authTerapeutaRoutes)
app.use('/api', areaRoutes);
// app.use('/api', tasksRoutes);


export default app;