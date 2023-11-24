const express = require('express');  // Importa el módulo Express
const router = express.Router();  // Crea un router de Express
const citaModel = require('../modelos/modeloCitas');  // Importa el modelo de citas definido en otro archivo
const moongose = require('mongoose');  // Importa Mongoose, una biblioteca de modelado de objetos MongoDB

// Ruta para registrar una nueva cita
router.post('/registerCita', async (req, res) => {
    const { numeroDocumento, nombre, apellido, correo, fecha, hora, numAutorizacion, medico } = req.body;

    try {
        // Crea una nueva cita en la base de datos usando el modelo de citas
        const cita = await citaModel.create({
            numeroDocumento: numeroDocumento,
            nombre,
            apellido,
            correo,
            fecha,
            hora,
            numAutorizacion,
            medico
        });

        // Responde con un mensaje de éxito
        res.status(201).json({
            success: true,
            msg: "Cita creada exitosamente"
        });
    } catch (error) {
        // Maneja errores al crear la cita
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Ruta para consultar citas de un paciente por número de documento
router.get('/consultar/:numeroDocumento', async (request, response) => {
    try {
        const numeroDocumento = request.params.numeroDocumento;

        // Validación: Se necesita el número de documento para buscar citas
        if (!numeroDocumento) {
            return response.status(400).json({
                success: false,
                msg: "Se necesita el número de documento para buscar citas."
            });
        }

        // Consulta citas para el paciente con el número de documento especificado
        const citasPaciente = await citaModel.find({ numeroDocumento: numeroDocumento });

        // Manejo de resultados
        if (!citasPaciente || citasPaciente.length === 0) {
            return response.status(404).json({
                success: false,
                msg: `No se encontraron citas para el paciente con número de documento ${numeroDocumento}.`
            });
        }

        // Responde con las citas encontradas
        response.status(200).json({
            success: true,
            results: citasPaciente
        });
    } catch (error) {
        // Maneja errores internos del servidor
        console.error("Error interno del servidor:", error);
        response.status(500).json({
            success: false,
            msg: "Error interno del servidor"
        });
    }
});

// Ruta para consultar citas de un médico por nombre
router.get('/consultarM/:medico', async (request, response) => {
    try {
        const medico = request.params.medico;

        // Validación: Se necesita el nombre para buscar citas
        if (!medico) {
            return response.status(400).json({
                success: false,
                msg: "Se necesita el nombre para buscar citas."
            });
        }

        // Consulta citas para el médico con el nombre especificado
        const citasMedico = await citaModel.find({ medico: medico });

        // Manejo de resultados
        if (!citasMedico || citasMedico.length === 0) {
            return response.status(404).json({
                success: false,
                msg: `No se encontraron citas para el médico con nombre ${medico}.`
            });
        }

        // Responde con las citas encontradas
        response.status(200).json({
            success: true,
            results: citasMedico
        });
    } catch (error) {
        // Maneja errores internos del servidor
        console.error("Error interno del servidor:", error);
        response.status(500).json({
            success: false,
            msg: "Error interno del servidor"
        });
    }
});

// Ruta para eliminar una cita por su ID
router.delete('/:id', async (request, response) => {
    try {
        const citaId = request.params.id;

        // Validación: Verifica el formato del ID
        if (!moongose.Types.ObjectId.isValid(citaId)) {
            response.status(500).json({
                success: false,
                msg: "ID inválido"
            });
        } else {
            // Elimina la cita por su ID
            const borrarCita = await citaModel.findByIdAndDelete(citaId);

            // Manejo de resultados
            if (!borrarCita) {
                return response.status(404).json({
                    success: false,
                    msg: `No se encuentra la cita con ID: ${citaId}`
                });
            } else {
                // Responde con éxito
                response.status(200).json({
                    success: true,
                    results: []
                });
            }
        }
    } catch (error) {
        // Maneja errores al eliminar una cita
        response.status(500).json({
            success: false,
            msg: "Error interno del servidor"
        });
    }
});

// Ruta para actualizar una cita por su ID
router.put('/:id', async (request, response) => {
    try {
        const citaId = request.params.id;

        // Validación: Verifica el formato del ID
        if (!moongose.Types.ObjectId.isValid(citaId)) {
            response.status(500).json({
                success: false,
                msg: "ID inválido"
            });
        } else {
            // Actualiza la cita por su ID con los datos proporcionados en el cuerpo de la solicitud
            const updCita = await citaModel.findByIdAndUpdate(
                citaId,
                request.body,
                {
                    new: true
                }
            );

            // Manejo de resultados
            if (!updCita) {
                return response.status(404).json({
                    success: false,
                    msg: `No se encuentra la cita con ID: ${citaId}`
                });
            } else {
                // Responde con éxito y los resultados actualizados
                response.status(200).json({
                    success: true,
                    results: updCita
                });
            }
        }
    } catch (error) {
        // Maneja errores al actualizar una cita
        response.status(500).json({
            success: false,
            msg: "Error interno del servidor"
        });
    }
});

// Exporta el router para su uso en otras partes de la aplicación
module.exports = router;
