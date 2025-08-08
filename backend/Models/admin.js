import mongoose from 'mongoose'

const SchemaAdmin = new mongoose.Schema({
    AdminUsuarioCodigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    AdminDepartamento: { type: String, required: true },
    AdminClasesAdministradas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clase' }]
});

const ModeloAdmin = mongoose.model('Admin', SchemaAdmin);
export default  ModeloAdmin