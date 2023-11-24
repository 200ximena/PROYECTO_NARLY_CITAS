const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt =require('jsonwebtoken')

//campos de la tabla y sus restricciones 
const userSchema = new mongoose.Schema(
    {
        nombre:{
            type:String,
        },
        apellido:{
            type:String,
        },
        tipoDocumento:{
            type:String,
        },
        numeroDocumento:{
            type:String,
            unique: [true,"documento existente, vuelva a intentarlo"]
        },
        correo:{
            type:String,
            unique: [true,"correo electronico existente, vuelva a intentarlo"]
        },
        contraseña:{
            type:String,
            min:6
        },
        especialidad:{
            type:String,
        },
        estado:{
            type:String,
            enum:[
                "activo",
                "inactivo"
            ]
            
        },
        rol:{
            type:String,
            enum:[
                "paciente",
                "medico",
                "director"
            ]
        },
    }
)

//antes de guardar
userSchema.pre('save', async function(next){
    //crear la sal
    const sal = await bcryptjs.genSalt(10)
    //encriptar la contraseña
    this.contraseña= await bcryptjs.
                   hash(this.contraseña, sal)
})

//token de la contraseña que el usuario registro, para inciar sesion
// Método para obtener un token JWT (JSON Web Token) para el usuario
userSchema.methods.ObtenerTokenJWT = function () {
    // Clave secreta para firmar el token
    const JWT_SECRET_KEY = "HOLAA";

    // Utiliza la biblioteca 'jsonwebtoken' para firmar un objeto con la información del usuario y generar un token
    return jwt.sign({
        id: this._id,  // Identificador único del usuario en la base de datos
        numeroDocumento: this.numeroDocumento,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        contraseña: this.contraseña,
        especialidad: this.especialidad,
        estado: this.estado,
        rol: this.rol
    },
        JWT_SECRET_KEY,  // Clave secreta para firmar el token
        {
            expiresIn: Date.now() + 10000  // Configura la expiración del token (ejemplo: 10 segundos)
        }
    );
}

// Método para comparar una contraseña proporcionada con la contraseña almacenada del usuario
userSchema.methods.comparacionContrasena = async function (contraseña) {
    // Utiliza la biblioteca 'bcryptjs' para comparar la contraseña proporcionada con la contraseña almacenada de forma segura
    return await bcryptjs.compare(contraseña, this.contraseña);
}

const User = module.exports = mongoose.model('User',userSchema)
