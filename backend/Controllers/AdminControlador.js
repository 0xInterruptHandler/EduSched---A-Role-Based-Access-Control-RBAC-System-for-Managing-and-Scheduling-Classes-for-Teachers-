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

        const revisarUsuario = await ModeloUsuario.findById(UsuarioCodigo)
        if(revisarUsuario.rol =='Admin'){
            return res.status(409).json({message:"No puedes eliminar a un administrador"})
        }else if (revisarUsuario.rol === "Profesor") {
            await ModeloHorario.deleteMany({ ProfesorCodigo: UsuarioCodigo });
            await ModeloProfesor.findOneAndDelete({ UsuarioCodigo: UsuarioCodigo });
        } else if (revisarUsuario.rol === "Estudiante") {
            await ModeloEstudiante.findOneAndDelete({ UsuarioCodigo: UsuarioCodigo});
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



import Schedule from "../Models/schedule.js";
import Teacher from "../Models/teachers.js";

const assignTeacher = async (req, res) => {
    try {
        // parametros de la solicitud: correspondientes al documento de horario
        const { HorarioClaseCodigo, ProfesorCodigo, dia, periodo } = req.body;

        if (!HorarioClaseCodigo || !ProfesorCodigo || !dia || !periodo) {
            return res.status(400).json({ success: false, message: "Se requieren todos los campos!" });
        }

   
        const profesor = await ModeloProfesor.findOne({
            UsuarioCodigo: ProfesorCodigo,
            disponible: {
                $elemMatch: {
                    dia,
                    periodos: { $elemMatch: { periodo, estaDisponible: true } },
                },
            },
        });

        if (!profesor) {
            return res.status(400).json({ success: false, message: "Profesor no disponible para este slot!" });
        }

        const existeHorario = await ModeloHorario.findOne({ HorarioClaseCodigo, dia, periodo });
        if (existeHorario) {
            return res.status(409).json({ success: false, message: "Este horario ya ha sido asignado a otro profesor!" });
        }

        const horario = await ModeloHorario.create({ HorarioClaseCodigo, dia, periodo, ProfesorCodigo });

        await ModeloProfesor.updateOne(
            { UsuarioCodigo: ProfesorCodigo, "disponible.dia": dia },
            {
                $set: {
                    "disponible.$[dayFilter].periodos.$[periodFilter].estaDisponible": false,
                },
            },
            {
                arrayFilters: [{ "dayFilter.dia": dia }, { "periodFilter.period": priodo }],
            }
        );

        res.status(200).json({ success: true, message: "Profesor asignado correctamente!", horario });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error en el servidor." });
        console.error(error);
    }
};

 

export {getUser,deleteuser,assignTeacher}


