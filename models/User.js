// Importamos Mongoose para definir y tener el esquema de usuario y el modelo
const mongoose = require("mongoose")

// Definimos el esquema de usuario utilizando el constructor de Mongoose llamado Schema
const userShema = new mongoose.Schema({
    nombre: {type: String, required: true}, // Se requiere el campo nombre para el registro de usuario, y el tipo de dato es String,
    edad: {type: Number, required: true},
    email: {type: String, required: true, unique: true}, // Se requiere el campo email para el registro de usuario, y el tipo de dato es String, y debe ser unico
    password: {type: String, required: true}
})

// Crear el modelo user utilizando el esquema definido anteriormente
const modelUser = mongoose.model("User", userShema)

// Exportamos el modelo User para usarlo en cualquier otro archivo
module.exports = modelUser