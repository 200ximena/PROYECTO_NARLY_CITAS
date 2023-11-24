// Importación de módulos 
const express = require('express');
const router = express.Router();
const userModel = require('../modelos/modeloUsuario'); 
const moongoose = require('mongoose');

// Ruta para registrar un nuevo usuario
// duncion asincronica: las funciones asíncronas permiten que ciertas 
//operaciones se realicen de manera concurrente sin bloquear la ejecución del código.
router.post('/register', async (req, res) => {
    const { nombre, apellido, tipoDocumento, numeroDocumento, correo, contraseña, estado, especialidad, rol } = req.body;


    //se puede utilizar la palabra clave await para esperar la resolución de una promesa.
    try {
        // Crear un nuevo usuario en la base de datos
        const user = await userModel.create({
            nombre,
            apellido,
            tipoDocumento,
            numeroDocumento,
            correo,
            contraseña,
            estado,
            especialidad,
            rol
        });

        // Responder con un mensaje de éxito y un token JWT
        res.status(201).json({
            success: true,
            msg: "Usuario creado exitosamente",
            token: user.ObtenerTokenJWT()
        });
    } catch (error) {
        // Manejar errores al crear un usuario
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Ruta para obtener usuarios con ciertos estados y roles
router.get('/estados', async (req, res) => {
    try {
        const { estado, rol } = req.query;

        // Crear un objeto de filtro basado en los parámetros de consulta
        const filter = { rol };
        if (estado) {
            filter.estado = estado === 'activo'; // Filtro
        }

        // Consultar usuarios según el filtro
        const medicosA = await userModel.find(filter);

        // Responder con los usuarios obtenidos
        res.status(200).json({
            success: true,
            data: medicosA,
        });
    } catch (error) {
        // Manejar errores al obtener usuarios
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    // Validar la existencia de correo y contraseña
    if (!correo || !contraseña) {
        res.status(400).json({
            success: false,
            message: "Debe ingresar el email y password"
        });
    } else {
        try {
            // Encontrar usuario por correo y seleccionar la contraseña
            const user = await userModel.findOne({ correo }).select("+password");

            if (!user) {
                // Manejar el caso en que no se encuentra el usuario
                res.status(400).json({
                    success: false,
                    msg: "No se encontró el usuario"
                });
            } else {
                // Comparar contraseñas
                //La variable isMatch se utiliza para determinar si la comparación es exitosa.
                const isMatch = await user.comparacionContrasena(contraseña);

                if (!isMatch) {
                    // Manejar el caso en que la contraseña no coincide
                    res.status(400).json({
                        success: false,
                        msg: "Contraseña incorrecta"
                    });
                } else {
                    // Responder con éxito y un token JWT
                    res.status(200).json({
                        success: true,
                        msg: "La contraseña es correcta",
                        token: user.ObtenerTokenJWT()
                    });
                }
            }
        } catch (error) {
            // Manejar errores al realizar el inicio de sesión
            console.log(error);
        }
    }
});

// Ruta para consultar todos los usuarios
router.get('/consultar', async (request, response) => {
    try {
        // Consulta de todos los usuarios en la base de datos
        const todosLosUsuarios = await userModel.find();

        // Manejo de resultados
        if (!todosLosUsuarios || todosLosUsuarios.length === 0) {
            return response.status(404).json({
                success: false,
                msg: "No se encontraron usuarios registrados."
            });
        }

        // Manejo de éxito
        response.status(200).json({
            success: true,
            results: todosLosUsuarios
        });
    } catch (error) {
        // Manejar errores al consultar todos los usuarios
        console.error("Error interno del servidor:", error);
        response.status(500).json({
            success: false,
            msg: "Error interno del servidor"
        });
    }
});

// Ruta para eliminar un usuario por su ID
router.delete('/:id', async (request, response) => {
    try {
        const userId = request.params.id;

        // Validar el formato del ID
        if (!moongoose.Types.ObjectId.isValid(userId)) {
            response.status(500).json({
                success: false,
                msg: "ID inválido"
            });
        } else {
            // Eliminar el usuario por su ID
            const borrarCita = await userModel.findByIdAndDelete(userId);

            if (!borrarCita) {
                // Manejar el caso en que no se encuentra el usuario
                return response.status(404).json({
                    success: false,
                    msg: `No se encuentra el usuario con ID: ${userId}`
                });
            } else {
                // Responder con éxito
                response.status(200).json({
                    success: true,
                    results: []
                });
            }
        }
    } catch (error) {
        // Manejar errores al eliminar un usuario
        response.status(500).json({
            success: false,
            msg: "Error interno del servidor"
        });
    }
});

// Ruta para actualizar un usuario por su ID
router.put('/:id', async (request, response) => {
    try {
        const userId = request.params.id;

        // Validar el formato del ID
        if (!moongoose.Types.ObjectId.isValid(userId)) {
            response.status(500).json({
                success: false,
                msg: "ID inválido"
            });
        } else {
            // Actualizar el usuario por su ID
            const updUser = await userModel.findByIdAndUpdate(
                userId,
                request.body,
                {
                    new: true
                }
            );

            if (!updUser) {
                // Manejar el caso en que no se encuentra el usuario
                return response.status(404).json({
                    success: false,
                    msg: `No se encuentra el usuario con ID: ${userId}`
                });
            } else {
                // Responder con éxito y los resultados actualizados
                response.status(200).json({
                    success: true,
                    results: updUser
                });
            }
        }
    } catch (error) {
        // Manejar errores al actualizar un usuario
        response.status(500).json({
            success: false,
            msg: "Error interno del servidor"
        });
    }
});

// Exportar el router para su uso en otras partes de la aplicación
module.exports = router;
