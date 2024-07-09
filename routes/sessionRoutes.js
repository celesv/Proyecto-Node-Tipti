// Importamos express y creamos un objeto router
const express = require("express");
const router = express.Router();

// Importamos el controlador de sessionRoutes
const sessionController = require("../controllers/sessionController");
const verifyToken  = require("../middlewares/verifyToken");

// Ruta protegida para obtener la información del usuario que ha iniciado sesión
router.post("/currentUser", verifyToken, sessionController); // Ruta protegida para obtener información del usuario que esta actuamente conectado

// Exportamos el router para usarlo en otros archivos
module.exports = router;