const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    return new Promise((resolve, reject) => {

        const token = req.headers.authorization; // Obtenemos el token de la cabecera de autorización

        if (!token) {
            reject({
                status: 401,
                message: "Token de autenticación no proporcionado"
            })
        }

        jwt.verify(token.split(" ")[1], "a80f8ff103d7e522f59dda48dd6f01ceb73c0f72babbd03d820348cf61900ecd", (err, decoded) => {
            if (err) {
                reject({
                    status: 401,
                    message: "Token de autenticación inválido"
                })
            } else {
                req.userId = decoded.userId; // Agregamos el ID del usuario decodificado para usarlo posteriormente
                resolve();
            }
        })
    })
        .then(() => {
            next(); // Continua el seguimiento del siguiente middleware o del siguiente controlador
        })
        .catch((err) => {
            res.status(err.status || 500).json({ message: err.message });
        })
}

module.exports = verifyToken


// Con jwt.sign() se crea un token JWT que lo que hace es cifrar el email y la password con una clave aleatoria (en este caso, 'a80f8ff103d7e522f59dda48dd6f01ceb73c0f72babbd03d820348cf61900ecd', aunque podria ser con cualquier otro String). Esto esta en el archivo 'services/authService.js' especificamente en la función generateToken() que se llama al momento del login(), es decir, cuando el usuario inicia sesion recibe el token JWT en el HTTP HEADERS/Cliente (navegador web).
// Y con jwt.verify() lo que se hace es DESCIFRAR el token que contiene el payload (email y password) que recibio el cliente (navegador web) y verificar si el token es correcto. Y esto se hace con la misma LLAVE que se utilizo para cifrar el email y la password: (en este caso, 'a80f8ff103d7e522f59dda48dd6f01ceb73c0f72babbd03d820348cf61900ecd'). Es decir, la llave me permite cifrar con el metodo sign() el email y la password en un token y DESCIFRAR con el metodo verify() el token para verificar el email y la password que esta en el HTTP HEADERS cifrada. Asi, si el email y la password son correctos, obtenemos la información del usuario en una ruta protegida que esta actuamente logueado.


// Dentro de esta función, se ejecuta jwt.verify() para verificar el token JWT. Dependiendo del resultado de esta verificación, se resuelve la promesa con resolve() o se rechaza con reject().
// jwt.verify(token, secretKey, callback): Se verifica el token JWT (token) utilizando la clave secreta (secretKey). El resultado de la verificación se maneja en la función callback, donde err contendrá un error si la verificación falla, y decoded contendrá el payload decodificado del token si la verificación es exitosa.
// token.split(" ")[1]: Esto se utiliza para obtener el token real de la cadena "Bearer <token>". La función split(" ") divide la cadena en un array donde el primer elemento es "Bearer" y el segundo elemento es el token JWT real (índice 1).
// 'a80f8ff103d7e522f59dda48dd6f01ceb73c0f72babbd03d820348cf61900ecd': Esta es la clave secreta utilizada para verificar la firma del token. En un entorno real, esta clave debería estar protegida y no hardcodeada en el código.
// Cuando menciono "hardcodeada" (o "hardcoded" en inglés), me refiero a la práctica de incluir valores fijos directamente en el código fuente de un programa en lugar de obtener esos valores de una fuente externa como un archivo de configuración, una variable de entorno, o una base de datos.
// El tercer argumento de jwt.verify() es una función de callback que se ejecuta una vez que se completa la verificación del token. Esta función tiene dos parámetros: err para capturar cualquier error que ocurra durante la verificación y decoded para almacenar el contenido decodificado del token JWT.
// decoded: Cuando el token JWT se verifica con éxito y no hay errores (err es null), decoded contiene la carga útil (payload) decodificada del token. Esto generalmente incluye información como el ID del usuario (userId en este caso) u otros datos que se hayan incluido al momento de crear el token.
// decoded contendrá la información decodificada del token, como el userId que se ha incluido al momento de firmar el token, es decir, contiene la información que fue cifrada e incluida al momento de generar el token, como el userId.
// req.userId = decoded.userId;: Aquí se asigna decoded.userId al objeto req (solicitud) en Express. Esto permite que el userId decodificado esté disponible para el resto de las funciones de manejo de rutas o middlewares en la solicitud actual. Esto es útil para almacenar información del usuario autenticado de manera que esté disponible para cualquier middleware o controlador que maneje la solicitud posteriormente en la cadena de manejo de solicitudes.
// resolve();: Se resuelve la promesa para indicar que la verificación y decodificación del token JWT fueron exitosas.
// Al devolver una promesa (implícitamente mediante el uso de jwt.verify()), la función que maneja la verificación del token permite que el código que llama a esta función utilice .then() y .catch() para manejar el resultado de manera más legible y estructurada.



// Verificación del Token: Cuando recibes un token JWT, para verificar su autenticidad y validar si ha sido alterado, utilizas la misma clave secreta para decodificar y verificar la firma del token. La función jwt.verify realiza esta verificación. Si la firma del token coincide con la firma generada utilizando la clave secreta, el token se considera válido y se decodifica para obtener la información del payload.



// En Express, los middleware son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la función next() en el ciclo de solicitud/respuesta de una aplicación. Estos middleware pueden ejecutar código, modificar los objetos de solicitud y respuesta, finalizar el ciclo de solicitud/respuesta y llamar a la siguiente función middleware en la pila.
// Para usar next() en un middleware en Node.js, necesitas estar utilizando algún framework de servidor que soporte middlewares. El más común es Express. El middleware Express tiene un método llamado next() que se utiliza para pasar el control a la siguiente función middleware en la cadena de middlewares.
// En el contexto de Express.js, next() es una función que se utiliza para pasar el control a la siguiente función middleware en la cadena de middlewares. Aunque JWT (JSON Web Token) en sí mismo no es un middleware, el proceso de verificar un JWT y decidir si una solicitud debe ser permitida o rechazada se suele implementar como un middleware.

