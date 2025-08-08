import mongoose from 'mongoose'

const SchemaProfesor = new mongoose.Schema({
    ProfesorUsuarioCodigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    ProfesorDepartamento: { type: String, required: true },
    ProfesorDisponible: [
        {
            dia: { type: String, enum: ['L', 'Mar', 'Mie', 'J', 'V'] },
            periodos: [{ periodo: Number, estaDisponible: Boolean }]
        }
    ],
    ProfesorHorariosAsignados: [
        {
            ClaseCodigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Clase' },
            dia: String,
            periodo: Number
        }
    ],
    ProfesorTutorDe: { type: mongoose.Schema.Types.ObjectId, ref: 'Clase' }
});

export const ModeloProfesor = mongoose.model('Profesor', SchemaProfesor);


export default ModeloProfesor;
