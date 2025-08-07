import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import DBConexion from './Utils/db.js'
import AuthRoutes from './Routes/AutenticacionControlador.js'
import cookieparser from 'cookie-parser'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000

DBConexion()


app.use(express.json())

app.use(cookieparser())

app.use('/api/auth',AuthRoutes)
 


app.get('/',(req,res)=>{
    res.send('test')
})

app.listen(PORT,()=>{
    console.log(`servidor ejecutandose en el puerto:  ${PORT}`)
})
