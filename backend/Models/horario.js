import mongoose from "mongoose";


const SchemaHorario = new mongoose.Schema({
    HorarioClaseCodigo: { type: String,required: true },  
    ProfesorCodigo: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    dia: { type: String, enum: ['L', 'Mar', 'Mie', 'J', 'V'] , required: true },
    periodo: { type: Number, required: true }, 
    FechaCreacion: { type: Date, default: Date.now }
});


const ModeloHorario = mongoose.model("Horario", SchemaHorario);

export default ModeloHorario;
