import mongoose from "mongoose";

const SchemaUsuario = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },  
    rol: { type: String, enum: ['Admin', 'Profesor', 'Estudiante'], required: true },  
    CodigoReferencia: { type: mongoose.Schema.Types.ObjectId },  
    FechaCreacion: { type: Date, default: Date.now }
});

export const ModeloUsuario = mongoose.model('Usuario', SchemaUsuario);


export default ModeloUsuario