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
  it('debería registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/registrar')
      .send({
        nombre: 'Test2',
        correo: 'test2@example.com',
        password: '123456',
        rol: 'Estudiante'
      })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('Usuario')
  })
})

// {
//   "nombre": "Carlos Ruiz",
//   "correo": "carlos.teacher@example.com",
//   "password": "securePassword123",
//   "rol": "Profesor",
//   "departamento": "Matemáticas"
// }
 