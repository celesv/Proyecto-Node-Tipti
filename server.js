const express = require("express")
const userRoutes = require("./routes/userRoutes")
const db = require("./db/db")

// Creamos una instancia de express
const app = express()
const PORT = 3010


// express.json(): Middleware de Express que interpreta y convierte automáticamente el cuerpo de las solicitudes entrantes (en formato JSON) en objetos JavaScript que pueden ser manipulados fácilmente en el servidor. Se usa para manejar datos JSON recibidos en solicitudes POST, PUT, etc.
// Esta línea configura express.json() como middleware global para la aplicación Express. Esto significa que cualquier solicitud entrante con un cuerpo en formato JSON será automáticamente parseada por este middleware.
// Después de que express.json() ha parseado el cuerpo de la solicitud entrante, el resultado se almacena en req.body, que es un objeto JavaScript que contiene los datos de la solicitud.
app.use(express.json())

// Iniciamos el servidor y lo ponemos en escucha en el puerto indicado
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Iniciamos la db al llamar a la función connectDB que esta en db\db.js
db();

// Hasta el momento, si el servidor escucha el puerto veremos en consola "Server running on port 3010". Y si existe conexión a la DB, veremos en consola "Conexión a la DB establecida correctamente".

// Rutas 
app.use("/api/users", userRoutes)
