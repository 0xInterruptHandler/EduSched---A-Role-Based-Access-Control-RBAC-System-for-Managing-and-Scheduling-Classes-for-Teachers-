import ModeloUsuario from "../Models/usuario.js"
import ModeloProfesor from "../Models/profesor.js"
import ModeloEstudiante from "../Models/estudiante.js"
import ModeloHorario from "../Models/horario.js";

const getUser = async(req,res) =>{
    try {
        const usuarios = await ModeloUsuario.find()
        res.status(200).json({usuarios})
    } catch (error) {
        res.status(500).json({message:"Error en el servidor!"})
        console.log(error)
    }
}

 
const deleteuser = async(req,res) =>{
    try {
        const UsuarioCodigo = req.params.id

        const revisarAdmin = await ModeloUsuario.findById(UsuarioCodigo)
        if(revisarAdmin.rol =='Admin'){
            return res.status(409).json({message:"No puedes eliminar a un administrador"})
        }else if (revisarAdmin.rol === "Profesor") {
            await ModeloHorario.deleteMany({ ProfesorCodigo: UsuarioCodigo });
            await ModeloProfesor.findOneAndDelete({ UsuarioCodigo: UsuarioCodigo });
        } else if (revisarAdmin.rol === "Estudiante") {
            await Student.findOneAndDelete({ UsuarioCodigo: UsuarioCodigo});
        } 

        const usuario = await ModeloUsuario.findByIdAndDelete(UsuarioCodigo)

        if(!usuario){
            return res.status(404).json({success:false,message:"Usuario no encontrado!"})
        }
        res.status(200).json({message:"Usuario eliminado correctamente",usuario})
    } catch (error) {
        res.status(500).json({message:"Error en el servidor!"})
        console.log(error)
    }
}

export {getUser,deleteuser}


