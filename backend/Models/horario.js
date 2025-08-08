import mongoose from "mongoose";


const SchemaHorario = new mongoose.Schema({
    HorarioClaseCodigo: { type: String,required: true },  
    HorarioProfesorCodigo: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    HorarioDia: { type: String, enum: ['L', 'Mar', 'Mie', 'J', 'V'] , required: true },
    HorarioPeriodo: { type: Number, required: true }, 
    HorarioFechaCreacion: { type: Date, default: Date.now }
});


const ModeloHorario = mongoose.model("Horario", SchemaHorario);

export default ModeloHorario;
