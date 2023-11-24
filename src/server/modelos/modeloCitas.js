const mongoose = require('mongoose')

//campos de la tabla y sus restricciones 
const citaSchema = new mongoose.Schema(
    {
        numeroDocumento:{
            type:String,
            unique:true 
        },
        nombre:{
            type:String,
        },
        apellido:{
            type:String,
        },
        correo:{
            type:String,
        },
        fecha:{
            type:String,
            unique:true
        },
        hora:{
            type:String,
            unique:true
        },
        numAutorizacion:{
            type:String,
            unique:true
        },
        medico:{
            type:String,
        }
        
    }
)

const Cita =
module.exports = mongoose.model('Cita',citaSchema)