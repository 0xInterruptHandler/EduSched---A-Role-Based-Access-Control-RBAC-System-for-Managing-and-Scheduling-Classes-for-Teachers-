// server.js
import app from './app.js'
import DBConexion from './Utils/db.js'

const PORT = process.env.PORT || 3000

DBConexion().then(() => {
  app.listen(PORT, () => {
    console.log(`servidor ejecutandose en el puerto: ${PORT}`)
  })
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err)
})
