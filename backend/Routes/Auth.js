import express from'express'
import { registrar, revisarUsuario, getProfesores,getEstudiantes} from '../Controllers/Auth.js'
import { iniciarSesion } from '../Controllers/Auth.js'
import { cerrarSesion } from '../Controllers/Auth.js'
import { esUsuario } from '../Middleware/VerifyToken.js'
 
const AutenticacionRutas = express.Router()

AutenticacionRutas.post('/registrar',registrar)
AutenticacionRutas.post('/iniciarsesion',iniciarSesion)
AutenticacionRutas.post('/cerrarsesion',cerrarSesion)
AutenticacionRutas.get('/getProfesores',getProfesores)
AutenticacionRutas.get('/getEstudiantes',getEstudiantes)
AutenticacionRutas.get('/revisarUsuario',esUsuario,revisarUsuario)
 
export default AutenticacionRutas
