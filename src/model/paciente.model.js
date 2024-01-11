import mongoose from 'mongoose'

const pacienteSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    identidad: {
        type: String,
        required: false,
        unique: true,
        sparse: true  // Esto permite varios documentos con 'identidad' nula
    },
    direccion: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now,
        required: false
    },
    nacimiento: {
        type: String,
        required: false
    },
    imagen: {
        type: String,
        required: false
    },
    area_asignada: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Area',
         required: true },
    
    padre: {
        type: String,
        required: false
    },
    madre: {
        type: String,
        required: false
    },
    informe: {
        type: String,
        required: false
    },
    telefono: {
        type: String,
        required: false
    },
    compromiso: {
        type: String,
        required: false
    },


}, {timestamps:true})

export default mongoose.model('Paciente', pacienteSchema)