import mongoose from "mongoose";

const SchemaUsuario = new mongoose.Schema({
    UsuarioNombre: { type: String, required: true },
    UsuarioCorreo: { type: String, required: true, unique: true },
    UsuarioPassword: { type: String, required: true },  
    UsuarioRol: { type: String, enum: ['Admin', 'Profesor', 'Estudiante'], required: true },  
    UsuarioCodigoReferencia: { type: mongoose.Schema.Types.ObjectId },  
    UsuarioFechaCreacion: { type: Date, default: Date.now }
});

export const ModeloUsuario = mongoose.model('Usuario', SchemaUsuario);


export default ModeloUsuario