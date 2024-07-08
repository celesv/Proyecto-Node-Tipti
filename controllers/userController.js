// Importamos el modelo de user
const User = require("../models/User");

// Funcion para obtener todos los usuarios
function getAllUsers(req, res) {
    // Utilizamos el metodo find() para obtener todos los usuarios. El método find que suele utilizarse en contextos de bases de datos MongoDB con Mongoose no es propio de JavaScript en sí, sino que es parte de la API proporcionada por Mongoose para interactuar con las colecciones de la base de datos MongoDB de manera estructurada y orientada a objetos.

    User.find().then((e) => {
        res
            .json(e) // Respondemos con la lista de usuarios. Enviamos todos los usuarios como respuesta. Cuando la consulta se completa exitosamente, el método then() se ejecuta con el resultado de la consulta, que en este caso es un arreglo de objetos (cada objeto representa un usuario encontrado). Luego, res.json(e) envía una respuesta JSON al cliente, donde e es el arreglo de usuarios encontrado.
            // Cada objeto en el arreglo e será un documento de usuario convertido automáticamente a un objeto JSON por Mongoose.
            // La función .json() en Node.js y en la mayoría de los frameworks web, como Express, es un método que convierte el contenido de un objeto JavaScript en formato JSON.
            .catch((err) => {
                console.log(err);
                res.status(500).send("Error al obtener los usuarios");
            });
    });
}

// Funcion para crear un nuevo usuario
function createUser(req, res) {
    // Extraemos toda la informacion del body de la peticion, es decir, del cuerpo de la solicitud de HTTP POST.
    // Extraemos toda la información del cuerpo de la petición HTTP POST.
    const { nombre, edad, email, password } = req.body;

    // Otra forma de obtener esas propiedades del objeto req.body en JavaScript es de la siguiente manera:
    // function createUser(req) {
    //     const nombre = req.body.nombre;
    //     const edad = req.body.edad;
    //     const email = req.body.email;
    //     const password = req.body.password;
    // }

    // Creamos un nuevo usuario con el metodo create() de mongoose
    // Al llamar a User.create({ nombre, edad, email, password }), estás pasando un objeto JavaScript que contiene los datos del usuario que deseas guardar en la base de datos.
    // En este punto, Mongoose toma este objeto y lo utiliza para crear un nuevo documento en la colección de usuarios de MongoDB. Internamente, Mongoose se encarga de manejar la conexión a la base de datos, realizar la operación de inserción y manejar cualquier validación o transformación que hayas definido en tu esquema de usuario (User).
    // Cuando la operación de creación tiene éxito, el método create() devuelve el objeto del usuario recién creado como resultado ('e' en este caso, que contiene el documento creado con todos sus campos).
    // Luego, envías este objeto como respuesta al cliente en formato JSON utilizando res.json(e). Esto significa que el cliente recibirá los datos del usuario recién creado en formato JSON.
    // Antes de llamar a User.create(), ya has extraído estos datos del cuerpo de la solicitud HTTP (req.body), por lo que User.create() los utiliza en el momento de su invocación para realizar la operación de creación en MongoDB.
    User.create({ nombre, edad, email, password })
        .then((e) => res.json(e)) // Si se crea correctamente, enviamos el nuevo usuario como respuesta en formato JSON

        .catch((err) => {
            console.log(err);
            res.status(500).send("Error al crear el usuario"); // Si ocurre un error durante la creación, lo registramos en la consola y enviamos un mensaje de error al cliente
        })
}

function updateUser(req, res) {
    // Obtenemos el id del usuario que queremos actualizar
    // .params es una propiedad del objeto de solicitud (req) proporcionado por frameworks como Express.js. Esta propiedad se utiliza para acceder a los parámetros de la ruta en una solicitud HTTP
    const userId = req.params.id;

    // Obtenemos los datos actualizados del usuario del body de la peticion/req
    const updateUser = req.body;

    // Utilizamos el metodo findByIdAndUpdate() de mongoose para actualizar el usuario por ID
    User.findByIdAndUpdate(userId, updateUser, { new: true }) // Recibe 3 argumentos: el ID del usuario, los datos actualizados, y el tercero hace referencia a que sea actualizado como nuevo
        .then(e => res.status(200).json(e))
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error al actualizar el usuario");
        })
}

// Definir Rutas con Parámetros en Express.js
// Cuando usas Express.js para crear un servidor web en Node.js, defines "rutas" que el servidor debe manejar. Una ruta es una combinación de una URL y un método HTTP (GET, POST, PUT, DELETE, etc.). Estas rutas pueden tener "parámetros" que son partes variables de la URL.
// Los parámetros de ruta son segmentos de la URL que pueden cambiar, y se identifican con un nombre precedido por dos puntos (:). Estos parámetros permiten que la misma ruta maneje diferentes valores dinámicos.
// Si un usuario hace una solicitud a http://localhost:3000/users/123, Express asigna el valor 123 al parámetro id.
// Puedes tener múltiples parámetros de ruta:
// app.get('/users/:userId/books/:bookId', (req, res) => {
//     const userId = req.params.userId;
//     const bookId = req.params.bookId;
//     res.send(`User ID is ${userId} and Book ID is ${bookId}`);
// });
// http://localhost:3000/users/123/books/456
// Respuesta: "User ID is 123 and Book ID is 456"

function deleteUser(req, res) {
    // Obtenemos el id del usuario que queremos borrar
    const userId = req.params.id;

    // Utilizamos el metodo findByIdAndDelete() de mongoose para borrar el usuario por ID
    User.findByIdAndDelete(userId)
        .then(() => res.status(204).send("Usuario borrado exitosamente")) //Enviamos una confirmación al cliente que el usuario ha sido borrado exitosamente
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error al borrar el usuario");
        })

}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};

// then y catch son métodos utilizados en JavaScript para manejar promesas (promises). Cuando trabajas con Mongoose, muchas de sus operaciones, como consultas a la base de datos, devuelven promesas. Esto se debe a que estas operaciones suelen ser asíncronas y pueden no completarse de inmediato, por lo que las promesas permiten manejar su resultado (ya sea éxito o error) de una manera más organizada y legible.
// Una operación asíncrona es una tarea que se inicia y luego se permite continuar con otras tareas mientras se espera que la operación asíncrona se complete. No bloquea la ejecución del programa; en cambio, el programa sigue funcionando y la operación asíncrona notifica su finalización a través de mecanismos como callbacks, promesas (then y catch), o async y await.
// Ejemplo de Operación Asíncrona
// Lectura de archivos: Leer un archivo desde el disco.
// Solicitudes HTTP: Hacer una petición a una API web.
// Operaciones de base de datos: Consultar o actualizar datos en una base de datos.






