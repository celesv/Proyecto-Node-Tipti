// Importamos express y creamos un objeto router
const express = require("express");
const router = express.Router();

// Importamos el controlador de authRoutes
const authController = require("../controllers/authController");

// Ruta para iniciar sesión
router.post("/login", authController.login); // Aqui no se envia un objeto completo, solo el email y la password. Aca no tiene sentido colocar el middleware verifyToken, ya que el token recien se lo esta creando en el mismo login. Es decir, el token se crea cuando el usuario inicia sesion, por lo que el token aun no se ha creado antes de esto. Es decir, aqui recien SE OBTIENE el token.
router.get("/logout", authController.logout); // Ruta para cerrar sesión

module.exports = router;