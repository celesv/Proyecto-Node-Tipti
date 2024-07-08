const express = require("express")
const userRoutes = require("./routes/userRoutes")
const db = require("./db/db")

// Creamos una instancia de express
const app = express()
const PORT = 3010

// Invocamos al Middleware para que parsee los datos del body de las solicitudes en formato Json
app.use(express.json())

// Definimos las rutas
app.use("/api/users", userRoutes)

// Iniciamos el servidor y lo ponemos en escucha en el puerto indicado

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))