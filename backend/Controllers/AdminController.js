import ModeloUsuario from "../Models/usuario.js";
import ModeloProfesor from "../Models/profesores.js";
import ModeloEstudiante from "../Models/estudiantes.js";
import ModeloHorario from "../Models/horario.js";

const getUser = async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.find();
        res.status(200).json({ usuarios });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor!" });
        console.log(error);
    }
};

const deleteuser = async (req, res) => {
    try {
        const UsuarioCodigo = req.params.id;

        const revisarUsuario = await ModeloUsuario.findById(UsuarioCodigo);
        if (!revisarUsuario) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado!" });
        }
        if (revisarUsuario.UsuarioRol === 'Admin') {
            return res.status(409).json({ message: "No puedes eliminar a un administrador" });
        } else if (revisarUsuario.UsuarioRol === "Profesor") {
            await ModeloHorario.deleteMany({ HorarioProfesorCodigo: UsuarioCodigo });
            await ModeloProfesor.findOneAndDelete({ ProfesorUsuarioCodigo: UsuarioCodigo });
        } else if (revisarUsuario.UsuarioRol === "Estudiante") {
            await ModeloEstudiante.findOneAndDelete({ EstudianteUsuarioCodigo: UsuarioCodigo });
        }

        const usuario = await ModeloUsuario.findByIdAndDelete(UsuarioCodigo);

        res.status(200).json({ message: "Usuario eliminado correctamente", usuario });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor!" });
        console.log(error);
    }
};

const assignTeacher = async (req, res) => {
    try {
        const { HorarioClaseCodigo, ProfesorCodigo, dia, periodo } = req.body;

        if (!HorarioClaseCodigo || !ProfesorCodigo || !dia || !periodo) {
            return res.status(400).json({ success: false, message: "Se requieren todos los campos!" });
        }

        const profesor = await ModeloProfesor.findOne({
            ProfesorUsuarioCodigo: ProfesorCodigo,
            ProfesorDisponible: {
                $elemMatch: {
                    dia,
                    periodos: { $elemMatch: { periodo: Number(periodo), estaDisponible: true } },
                },
            },
        });

        if (!profesor) {
            return res.status(400).json({ success: false, message: "Profesor no disponible para este slot!" });
        }

        const existeHorario = await ModeloHorario.findOne({ HorarioClaseCodigo, HorarioDia: dia, HorarioPeriodo: periodo });
        if (existeHorario) {
            return res.status(409).json({ success: false, message: "Este horario ya ha sido asignado a otro profesor!" });
        }

        const horario = await ModeloHorario.create({
            HorarioClaseCodigo,
            HorarioDia: dia,
            HorarioPeriodo: periodo,
            HorarioProfesorCodigo: ProfesorCodigo
        });

        await ModeloProfesor.updateOne(
            { ProfesorUsuarioCodigo: ProfesorCodigo, "ProfesorDisponible.dia": dia },
            {
                $set: {
                    "ProfesorDisponible.$[dayFilter].periodos.$[periodFilter].estaDisponible": false,
                },
            },
            {
                arrayFilters: [{ "dayFilter.dia": dia }, { "periodFilter.periodo": Number(periodo) }],
            }
        );

        res.status(200).json({ success: true, message: "Profesor asignado correctamente!", horario });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error en el servidor." });
        console.error(error);
    }
};

const getprofesoresDisponibles = async (req, res) => {
    try {
        const { dia, periodo } = req.query;

        if (!dia || !periodo) {
            return res.status(400).json({ success: false, message: "Los campos dia y periodo son requeridos." });
        }

        const profesoresDisponibles = await ModeloProfesor.find({
            ProfesorDisponible: {
                $elemMatch: {
                    dia,
                    periodos: {
                        $elemMatch: {
                            periodo: Number(periodo),
                            estaDisponible: true
                        }
                    }
                }
            }
        }, { ProfesorUsuarioCodigo: 1, _id: 0 });

        const ProfesorCodigos = profesoresDisponibles.map((prof) => prof.ProfesorUsuarioCodigo);

        const profesorDetalles = await ModeloUsuario.find(
            { _id: { $in: ProfesorCodigos } },
            { _id: 1, UsuarioNombre: 1 }
        );

        if (profesorDetalles.length === 0) {
            return res.status(404).json({ success: false, message: "No teachers found for the specified criteria." });
        }

        res.status(200).json({
            success: true,
            message: "Available teachers retrieved successfully.",
            data: profesorDetalles
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." });
        console.error(error);
    }
};

const deleteSchedule = async (req, res) => {
    try {
        const scheduleId = req.params.id;

        const schedule = await ModeloHorario.findById(scheduleId);
        if (!schedule) {
            return res.status(404).json({ success: false, message: "Schedule not found!" });
        }

        const { HorarioProfesorCodigo, HorarioDia, HorarioPeriodo } = schedule;

        await ModeloHorario.findByIdAndDelete(scheduleId);

        await ModeloProfesor.updateOne(
            { ProfesorUsuarioCodigo: HorarioProfesorCodigo, "ProfesorDisponible.dia": HorarioDia },
            {
                $set: {
                    "ProfesorDisponible.$[dayFilter].periodos.$[periodFilter].estaDisponible": true,
                },
            },
            {
                arrayFilters: [{ "dayFilter.dia": HorarioDia }, { "periodFilter.periodo": HorarioPeriodo }],
            }
        );

        res.status(200).json({ success: true, message: "Schedule deleted and teacher's availability updated successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." });
        console.error(error);
    }
};

export { getUser, deleteuser, assignTeacher, getprofesoresDisponibles, deleteSchedule };