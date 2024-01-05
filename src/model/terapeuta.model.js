import mongoose from 'mongoose'

const terapeutaSchema = new mongoose.Schema({
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
    area: {
        type: String,
        required: false
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
    profesion: {
        type: String,
        required: false
    },
    imagen: {
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

export default mongoose.model('Terapeuta', terapeutaSchema)