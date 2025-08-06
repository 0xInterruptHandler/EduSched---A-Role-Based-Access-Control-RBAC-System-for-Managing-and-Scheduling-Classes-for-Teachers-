import mongoose from "mongoose";

const SchemaClase = new mongoose.Schema({
    ClaseCodigo: { type: String, required: true, unique: true },  
    nombre: { type: String, required: true },             
    sala: { type: String, required: true },             
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }, 
    estudiantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Estudiante" }], 
    FechaCreacion: { type: Date, default: Date.now },      
});

const ModeloClase = mongoose.model("Clase", SchemaClase);

export default ModeloClase;
