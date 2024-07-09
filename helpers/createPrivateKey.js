const crypto = require("crypto"); // Importamos el paquete crypto para generar claves privadas 

const secretKey = crypto.randomBytes(32).toString("hex"); // Generamos una clave privada aleatoria de 32 bytes

console.log(secretKey); // a80f8ff103d7e522f59dda48dd6f01ceb73c0f72babbd03d820348cf61900ecd
