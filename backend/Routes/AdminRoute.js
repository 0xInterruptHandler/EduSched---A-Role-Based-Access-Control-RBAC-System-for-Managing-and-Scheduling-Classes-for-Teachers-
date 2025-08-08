import express from 'express'
import { getUser, deleteuser, assignTeacher, getprofesoresDisponibles, deleteSchedule } from '../Controllers/AdminController.js'
import { esAdmin } from '../Middleware/VerifyToken.js'
import { getClassSchedule } from '../Controllers/HorarioController.js'

const AuthAdmin = express.Router()

AuthAdmin.get('/getuser', esAdmin, getUser)
AuthAdmin.delete('/delete/:id', esAdmin, deleteuser)
AuthAdmin.get('/available', esAdmin, getprofesoresDisponibles)
AuthAdmin.post('/assignS', esAdmin, assignTeacher)
AuthAdmin.post('/deleteS/:id', esAdmin, deleteSchedule)
AuthAdmin.get('/classS/:classId', esAdmin, getClassSchedule)

export default AuthAdmin