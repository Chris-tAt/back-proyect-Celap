import mongoose from 'mongoose'

const areaSchema = new mongoose.Schema({
    nombre: {
        type: String
    },
    terapeuta: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Terapeuta', 
   },
   paciente: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente', 
},
//    aqui se hara la relacin entre los modelos
}, {timestamps:false})
  
export default mongoose.model('Area', areaSchema);