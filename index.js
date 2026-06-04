require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

// Importar rutas
const webhooksRouter = require('./src/routes/webhooks')
const adminRouter = require('./src/routes/admin')

// Montar rutas
app.use('/webhooks', webhooksRouter)
app.use('/api/admin', adminRouter)

// Middleware básico de manejo de errores
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}`))