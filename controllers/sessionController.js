const User = require("../models/User");

// Controlador para obtener la información del usuario que ha iniciado sesión

function getCurrentSession(req, res) {
    new Promise((resolve, reject) => {
        // El middleware de Auth 'verifyToken' ya almaceno en req.userId el ID del usuario decodificado
        const userId = req.userId;

        // Busca el usuario en la base de datos utilizando el ID decodificado
        // La función findById es otra función proporcionada por Mongoose para realizar consultas específicas en bases de datos MongoDB en Node.js. Esta función se utiliza para buscar un documento por su identificador único (_id), que es un campo único generado automáticamente por MongoDB para cada documento en una colección.
        User.findById(userId)
            .then((e) => {
                if (!e) {
                    reject({
                        status: 404,
                        message: "Usuario no encontrado"
                    });
                } else {
                    resolve(e);
                }
            })
            .catch((err) => {
                reject({
                    status: 500,
                    message: "Error al obtener la información del usuario", err});
            })
    })
    .then( e => {
        res.json(e); // Muestra la información del usuario que ha iniciado sesión en una solicitud HTTP 200 OK
    })
    .catch((err) => {
        console.error(err);
        res.status(err.status || 500).json({message: err.message});
    })
}       

module.exports = getCurrentSession;


// Diferencias entre module.exports = getCurrentSession y module.exports = {getCurrentSession}
// Si se exportaba sin llaves "module.exports = getCurrentSession", esto asigna directamente la función getCurrentSession a module.exports. Entonces, cuando se importa este módulo en otro archivo, el importador (variable) obtiene directamente la función getCurrentSession.
// "module.exports = {getCurrentSession}". Esto asigna un objeto que contiene getCurrentSession como una propiedad de ese mismo objeto a module.exports. Cuando se importa este módulo en otro archivo, el importador (variable) obtiene un objeto con la propiedad getCurrentSession.

// Entonces, al importar: const sessionController = require("../controllers/sessionController"). Esto implica que sessionController debe ser un objeto con una propiedad getCurrentSession. Si exportas getCurrentSession directamente sin las llaves, sessionController sería la función en sí misma y no un objeto que contenga la función.
// Al usar llaves ({ getCurrentSession }), exportas un objeto con getCurrentSession como propiedad, permitiendo que el controlador sea utilizado como un objeto y accesible con sessionController.getCurrentSession.



