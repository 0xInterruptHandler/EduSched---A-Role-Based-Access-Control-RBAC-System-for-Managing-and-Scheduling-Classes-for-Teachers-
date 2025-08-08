import mongoose from "mongoose";

const SchemaClase = new mongoose.Schema({
    ClaseCodigo: { type: String, required: true, unique: true },  
    ClaseNombre: { type: String, required: true },             
    ClaseSala: { type: String, required: true },             
    ClaseTutor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }, 
    ClaseEstudiantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Estudiante" }], 
    ClaseFechaCreacion: { type: Date, default: Date.now },      
});

const ModeloClase = mongoose.model("Clase", SchemaClase);

export default ModeloClase;
