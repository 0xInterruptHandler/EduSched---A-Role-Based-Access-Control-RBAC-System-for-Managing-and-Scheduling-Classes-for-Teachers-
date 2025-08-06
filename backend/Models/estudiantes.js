import mongoose from "mongoose";

const SchemaEstudiante = new mongoose.Schema({
    EstudianteUsuarioCodigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    EstudianteClaseCodigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Class',  }
});

const ModeloEstudiante = mongoose.model('Estudiante', SchemaEstudiante);

export default ModeloEstudiante