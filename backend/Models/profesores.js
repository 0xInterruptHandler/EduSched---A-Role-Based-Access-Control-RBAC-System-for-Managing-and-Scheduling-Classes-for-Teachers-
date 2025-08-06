import mongoose from 'mongoose'

const SchemaProfesor = new mongoose.Schema({
    UsuarioCodigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    departamento: { type: String, required: true },
    disponible: [
        {
            dia: { type: String, enum: ['M', 'T', 'W', 'Th', 'F'] },
            periodos: [{ period: Number, isAvailable: Boolean }]
        }
    ],
    HorariosAsignados: [
        {
            ClaseCodigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Clase' },
            dia: String,
            periodo: Number
        }
    ],
    TutorDe: { type: mongoose.Schema.Types.ObjectId, ref: 'Clase' }
});

export const ModeloProfesor = mongoose.model('Profesor', SchemaProfesor);


export default ModeloProfesor;
