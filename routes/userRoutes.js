// Importamos express y creamos un objeto router

const express = require("express");
// Se crea una instancia del enrutador utilizando express.Router().
const router = express.Router();

// Importamos el controlador de user
const userController = require("../controllers/userController");

// Definir las rutas para el CRUD de usuarios
router.get("/", userController.getAllUsers); // Ruta para obtener todos los usuarios
router.post("/", userController.createUser); // Ruta para crear un nuevo usuario
router.put("/:id", userController.updateUser); // Ruta para actualizar un usuario
router.delete("/:id", userController.deleteUser); // Ruta para eliminar un usuario

// Exportamos el router para usarlo en otros archivos
module.exports = router;


// Se crea un nuevo enrutador utilizando express.Router().
// Este enrutador puede manejar rutas específicas y métodos HTTP (GET, POST, PUT, DELETE, etc.) definidos en él.
// El enrutador se monta en la aplicación principal utilizando app.use(), especificando la ruta base (/ruta-especifica) donde se deben manejar las rutas definidas en el enrutador.


// MongoDB asigna automáticamente un identificador único (_id) a cada documento que se inserta en una colección. Este _id es único y se genera automáticamente en formato BSON (Binary JSON).
// const userId = req.params.id; esto captura el valor proporcionado en la URL, que se espera que sea el _id único del usuario que quieres actualizar en MongoDB.
// findByIdAndUpdate(): Este método de Mongoose busca un documento por su _id y lo actualiza con los datos proporcionados en la funcion updateUser.
// Entonces, para actualizar un usuario, tienes un endpoint en tu API como /usuarios/:id, donde :id representa el _id del usuario en MongoDB. Una solicitud HTTP (por ejemplo, PUT) a /usuarios/668bb11ba15f807fbea173f1 con datos actualizados en el cuerpo de la solicitud (req.body). 
// El req.params.id está diseñado para capturar el valor de _id específico de MongoDB de la URL de la solicitud HTTP.




