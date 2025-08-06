import ModeloUsuario from "../Models/usuario.js";
import Teacher from "../Models/profesores.js";
import HOD from "../Models/admin.js";
import Student from "../Models/estudiantes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registrar = async (req, res) => {
    try {
      const { nombre, correo, password, rol, departamento } = req.body;

      const esExistente = await ModeloUsuario.findOne({ correo });
      if (esExistente) {
        return res.status(401).json({ success: false, message: "Usuario Already Exists!" });
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10);
  
      const usuarioNuevo = new ModeloUsuario({
        nombre,
        correo,
        password: hashedPassword,
        rol,
      });
  
      await usuarioNuevo.save();
  
      let CodigoReferencia;
  
      if (rol === "Profesor") {

        const disponible = [
          {
            day: "L",
            periodos: [
              { periodo: 1, estaDisponible: true },
              { periodo: 2, estaDisponible: true },
              { periodo: 3, estaDisponible: true },
              { periodo: 4, estaDisponible: true },
            ],
          },
          {
            day: "Mar",
            periodos: [
              { periodo: 1, estaDisponible: true },
              { periodo: 2, estaDisponible: true },
              { periodo: 3, estaDisponible: true },
              { periodo: 4, estaDisponible: true },
            ],
          },
          {
            day: "Mier",
            periodos: [
              { periodo: 1, estaDisponible: true },
              { periodo: 2, estaDisponible: true },
              { periodo: 3, estaDisponible: true },
              { periodo: 4, estaDisponible: true },
            ],
          },
          {
            day: "J",
            periodos: [
              { periodo: 1, estaDisponible: true },
              { periodo: 2, estaDisponible: true },
              { periodo: 3, estaDisponible: true },
              { periodo: 4, estaDisponible: true },
            ],
          },
          {
            day: "V",
            periodos: [
              { periodo: 1, estaDisponible: true },
              { periodo: 2, estaDisponible: true },
              { periodo: 3, estaDisponible: true },
              { periodo: 4, estaDisponible: true },
            ],
          }
        ];
  
 
        const profesorNuevo = await Teacher.create({
          UsuarioCodigo: usuarioNuevo._id,
          departamento,
          disponible,
        });
  
        CodigoReferencia = profesorNuevo._id;
      }else if (rol === "Admin") {
 
        const adminNuevo = await HOD.create({
          UsuarioCodigo: usuarioNuevo._id,
          departamento,
          clasesAdministradas: [], 
        });
  
        CodigoReferencia = adminNuevo._id;
      } else if (rol === "Estudiante") {
 
        const estudianteNuevo = await Student.create({
          UsuarioCodigo: usuarioNuevo._id
        });
  
        CodigoReferencia = estudianteNuevo._id;
      } else {
        return res.status(400).json({ success: false, message: "Rol especificado invalido" });
      }
   

      usuarioNuevo.CodigoReferencia = CodigoReferencia;
      await usuarioNuevo.save();
  
      res.status(200).json({ message: "Usuario registrado correctamente", Usuario: usuarioNuevo });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error en el servidor" });
      console.error(error);
    }
  };

const iniciarSesion = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const Usuario = await ModeloUsuario.findOne({ correo });
    if (!Usuario) {
      return res.status(404).json({ success: false, message: "Usuario Does Not Exist" });
    }

    const esContrasenaValida = bcrypt.compareSync(password, Usuario.password);
    if (!esContrasenaValida) {
      return res.status(401).json({ success: false, message: "Contrasena incorrecta" });
    }

    const token = jwt.sign({ UsuarioCodigo: Usuario._id, rol: Usuario.rol }, process.env.SECRETKEY, {
      expiresIn: "1h",
    });

 
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, 
      sameSite:"None",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ success: true, message: "Inicio de sesion completado", Usuario, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error en el servidor" });
    console.error(error);
  }
};

const cerrarSesion = async (req, res) => {
  try {
  
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Cierre de sesion completado" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error en el servidor" });
    console.error(error);
  }
};


const revisarUsuario =async(req,res)=>{
  try {
    const Usuario =req.Usuario
    if(!Usuario){
      res.status(404).json({message:"Usuario no encontrado"})
    }
    res.status(200).json(Usuario)
  } catch (error) {
    res.status(500).json({message:"Error en el servidor"})
    console.log(error)
  }
}

 
const getProfesores = async (req, res) => {
  try {
    const teachers = await ModeloUsuario.find({ rol: 'Teacher' });

    if (teachers.length === 0) {
      return res.status(200).json({ message: "No hay registros almacenados." });
    }

    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor!" });
    console.log(error);
  }
};
 
const getEstudiantes = async (req, res) => {
  try {
    const students = await ModeloUsuario.find({ rol: 'Estudiante' });

    if (students.length === 0) {
      return res.status(200).json({ message: "No hay registros almacenados." });
    }

    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor!" });
    console.log(error);
  }
};



export { registrar, iniciarSesion, cerrarSesion ,revisarUsuario, getProfesores,getEstudiantes};
