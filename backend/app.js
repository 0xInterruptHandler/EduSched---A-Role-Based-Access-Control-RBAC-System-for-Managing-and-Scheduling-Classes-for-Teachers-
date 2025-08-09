// app.js
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AutenticacionRutas from './Routes/Auth.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api/auth', AutenticacionRutas)

app.get('/', (req, res) => {
  res.send('test')
})

export default app
