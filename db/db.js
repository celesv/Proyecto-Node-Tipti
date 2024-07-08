// Importamos mongoose para crear la conexion a la DB de MongoDB
const mongoose = require("mongoose")

// Establecemos la URL de la base de datos
const mongoUrl = "mongodb+srv://celeste:1234@dbnodetipti.1pnmemk.mongodb.net/proyectTipti"
// mongodb+srv://<username>:<password>@beyondthebasics.abcde.mongodb.net/db-name-here


// Función para conectar a la base de datos
function connectDB() {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoUrl)
            .then(() => {
                console.log("Conexión a la DB establecida correctamente");
                // Una vez conectada, resolvemos la promesa
                resolve();
            })
            .catch((err) => {
                // En caso de error, rechazamos la promesa
                console.error("Error al conectar a la DB", err);
                reject(err);
            });
    });
}

// Exportamos la función de la conexión a la base de datos para poder utilizarla en app.js
module.exports = connectDB;



