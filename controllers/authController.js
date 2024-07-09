const authService = require("../services/authService"); // Para poder usar el token JWT
const User = require("../models/User"); // Para poder usar el modelo User

// Controlador para manejar la autenticación de Usuarios

function login(req, res) {
    const { email, password } = req.body;


    // findOne es un método proporcionado por Mongoose para realizar consultas en una colección de MongoDB. Permite encontrar el primer documento que cumple con los criterios de búsqueda especificados.
    
    User.findOne({ email })
        .then((e) => { // 'e' es el resultado del findOne, que representa un usuario encontrado por su email. 'e' representa el usuario encontrado cuyo email coincidió con el que se buscaba.
            if (!e) {
                return res.status(401).json({ mesagge: "Credenciales incorrectas" });
            }

            const match = password === e.password;

            if (!match) {
                return res.status(401).json({ mesagge: "Credenciales incorrectas" });
            }

            const token = authService(e); // Aquí 'e' se pasa a una función generateToken() para generar un token JWT
            res.json({ token }); // Se envia la variable token al cliente (en este caso, el navegador)
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({mesagge: "Error al iniciar sesión"});
        });
}

// Controlador para cerrar sesión

function logout(req, res) {
    // localStorage.removeItem("token");
    res.json({ mesagge: "Sesion cerrada" });
}


module.exports = { login, logout };


