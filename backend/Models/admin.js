import mongoose from 'mongoose'

const SchemaAdmin = new mongoose.Schema({
    UsuarioCodigo: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    departamento: { type: String, required: true },
    managedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clase' }]
});

const ModeloAdmin = mongoose.model('Admin', SchemaAdmin);
export default  ModeloAdmin