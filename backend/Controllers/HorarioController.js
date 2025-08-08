import ModeloHorario from "../Models/horario.js";

const getTschedule = async (req, res) => {
    try {
        const tId  = req.params.tId;

        // Busca los horarios donde el profesor asignado es tId
        const schedules = await ModeloHorario.find({ HorarioProfesorCodigo: tId });
            
        if (!schedules.length) {
            return res.status(404).json({ success: false, message: "No schedules found for You!" });
        }

        res.status(200).json({ success: true, message: "Class schedule retrieved successfully!", schedules });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." });
        console.error(error);
    }
};
 
const getClassSchedule = async (req, res) => {
    try {
        const classCode  = req.params.classId;

        // Busca los horarios por el código de clase y popula el profesor asignado
        const schedules = await ModeloHorario.find({ HorarioClaseCodigo: classCode })
            .populate('HorarioProfesorCodigo', "UsuarioNombre");
            
        if (!schedules.length) {
            return res.status(404).json({ success: false, message: "No schedules found for this class!" });
        }

        res.status(200).json({ success: true, message: "Class schedule retrieved successfully!", schedules });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error." });
        console.error(error);
    }
};

export { getTschedule ,getClassSchedule}