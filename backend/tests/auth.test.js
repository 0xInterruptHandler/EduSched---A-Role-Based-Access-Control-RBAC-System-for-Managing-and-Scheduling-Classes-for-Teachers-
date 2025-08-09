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
})




