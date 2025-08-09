import request from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import dotenv from 'dotenv'

dotenv.config()

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODBURL)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('Auth endpoints', () => {

  // Test de registro e inicio de sesión de un Profesor
  it('debería registrar e iniciar sesión como Profesor', async () => {
    const profesor = {
      nombre: 'ProfesorTest',
      correo: 'profesor@example.com',
      password: 'profesor123',
      rol: 'Profesor',
      departamento: 'Matemáticas'
    }

    // Registrar
    const resRegistro = await request(app)
      .post('/api/auth/registrar')
      .send(profesor)

    expect(resRegistro.statusCode).toBe(200)
    expect(resRegistro.body).toHaveProperty('Usuario')
    expect(resRegistro.body.UsuarioNombre || resRegistro.body.Usuario?.UsuarioNombre).toBeDefined()

    // Iniciar sesión
    const resLogin = await request(app)
      .post('/api/auth/iniciarsesion')
      .send({ correo: profesor.correo, password: profesor.password })

    expect(resLogin.statusCode).toBe(200)
    expect(resLogin.body).toHaveProperty('token')
    expect(resLogin.body.Usuario.UsuarioRol).toBe('Profesor')

    // Cerrar sesión
    const resLogout = await request(app)
      .post('/api/auth/cerrarsesion')
      .set('Cookie', [`token=${resLogin.body.token}`])
    expect(resLogout.statusCode).toBe(200)
    expect(resLogout.body).toHaveProperty('success', true)

  })

  let testUser = {
    nombre: 'TestUser',
    correo: 'testuser@example.com',
    password: '123456',
    rol: 'Estudiante'
  }
  let token = ''

  it('debería registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/registrar')
      .send(testUser)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('Usuario')
  })

  it('debería iniciar sesión', async () => {
    const res = await request(app)
      .post('/api/auth/iniciarsesion')
      .send({ correo: testUser.correo, password: testUser.password })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    token = res.body.token
  })

  it('debería obtener la lista de profesores', async () => {
    const res = await request(app)
      .get('/api/auth/getProfesores')

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('teachers')
    expect(Array.isArray(res.body.teachers)).toBe(true)
  })

  it('debería obtener la lista de estudiantes', async () => {
    const res = await request(app)
      .get('/api/auth/getEstudiantes')

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('students')
    expect(Array.isArray(res.body.students)).toBe(true)
  })

  it('debería revisar el usuario autenticado', async () => {
    const res = await request(app)
      .get('/api/auth/revisarUsuario')
      .set('Cookie', [`token=${token}`])

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.UsuarioCorreo).toBe(testUser.correo)
  })

  it('debería cerrar sesión', async () => {
    const res = await request(app)
      .post('/api/auth/cerrarsesion')
      .set('Cookie', [`token=${token}`])

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('success', true)
  })




  // Test de registro e inicio de sesión de un Admin
  it('debería registrar e iniciar sesión como Admin', async () => {
    const admin = {
      nombre: 'AdminTest',
      correo: 'admin@example.com',
      password: 'admin123',
      rol: 'Admin',
      departamento: 'Sistemas'
    }

    // Registrar
    const resRegistro = await request(app)
      .post('/api/auth/registrar')
      .send(admin)

    expect(resRegistro.statusCode).toBe(200)
    expect(resRegistro.body).toHaveProperty('Usuario')
    expect(resRegistro.body.UsuarioNombre || resRegistro.body.Usuario?.UsuarioNombre).toBeDefined()

    // Iniciar sesión
    const resLogin = await request(app)
      .post('/api/auth/iniciarsesion')
      .send({ correo: admin.correo, password: admin.password })

    expect(resLogin.statusCode).toBe(200)
    expect(resLogin.body).toHaveProperty('token')
    expect(resLogin.body.Usuario.UsuarioRol).toBe('Admin')
  })

})




