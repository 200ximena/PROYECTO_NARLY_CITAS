//Importación de módulos:
//express: Framework para construir aplicaciones web y APIs en Node.js.
//cors: Middleware para manejar la política de mismo origen en las solicitudes HTTP.
//dotenv: Carga variables de entorno desde un archivo .env 
//colors: Mejora la salida en la consola con colores.
//mongoose: Biblioteca para interactuar con bases de datos MongoDB.
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoose = require('mongoose');



//Se define el número de puerto en el que la aplicación escuchará las solicitudes. 
//mediante la variable de entorno EXPRESS_PORT
const app = express();
const puerto = process.env.EXPRESS_PORT || 8888;

app.use(cors());


//Se define la URL de conexión a la base de datos MongoDBmde la variable de entorno MONGO_URL 
//Se utiliza mongoose.connect() para conectar la aplicación a la base de datos MongoDB. S
// para mostrar mensajes en la consola según si la conexión fue exitosa o no.
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/Proyecto';
mongoose.connect(mongoURL,{
})

.then(() => console.log('Conectado a la db'.bgCyan.black))
.catch(error => console.error('Error al conectar con la base de datos:', error.message));


// configurar express para analizar JSON en las solicitudes HTTP.
app.use(express.json());


//Asignar rutas
    const registarUsuariosRouter = require('./rutas/rutaUsuarios');
    app.use('/api/v1/devcamps/users', registarUsuariosRouter)

    const registarCitasRouter = require('./rutas/rutaCita');
    app.use('/api/v1/devcamps/citas', registarCitasRouter)


    //iniciar el servidor
    app.listen(puerto, () => {
        console.log(`El servidor se ha iniciado en el puerto ${puerto}`.bgMagenta.white)
    })
    
