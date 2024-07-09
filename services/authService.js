const jwt = require("jsonwebtoken"); // Importamos el paquete jwt para generar tokens

// Almacenamos nuestra clave secreta
const JWT_SECRET = "a80f8ff103d7e522f59dda48dd6f01ceb73c0f72babbd03d820348cf61900ecd"

// Creamos una función para generar un token JWT
const generateToken = (e) => {
    const payload = {
        userId: e._id,
        email: e.email
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // sign() recibe 3 argumentos: el payload que son los datos del usuario, la clave secreta, y el tiempo de expiración
    return token
}

module.exports = generateToken


// Firma y Codificación del Token: Cuando se crea un token JWT, se toma la información del usuario (payload) y se utiliza esta clave secreta para firmar digitalmente el token. Esto genera una firma que es parte del token JWT junto con la información codificada en Base64 del payload.





