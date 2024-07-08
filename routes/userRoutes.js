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