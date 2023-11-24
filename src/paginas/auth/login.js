import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const Login2 = () => {
  //traer los datos| definir variables
        const [correo, setCorreo] = useState('');
        const [contraseña, setCon] = useState('');

        const [error, setError] = useState('');

        const navigate = useNavigate();

        const parseToken = (token) => {
          const decodedToken = token.split('.')[1];
          const decodedData = JSON.parse(atob(decodedToken));
          return decodedData;
        };

        // Función asincrónica que maneja el envío de datos de inicio de sesión
        const datosLogin = async (e) => {
          // Prevenir el comportamiento por defecto del formulario
          e.preventDefault();
          try {
            // Realizar una solicitud POST a la API para iniciar sesión
            const response = await axios.post('http://127.0.0.1:8888/api/v1/devcamps/users/login', {
              correo,
              contraseña:contraseña,
            });
            // Verificar si se obtuvo un token en la respuesta
            if (response.data && response.data.token) {
              // Parsear el token para obtener su contenido
              const tokenPayload = parseToken(response.data.token);
              // Parsear el token para obtener su contenido
              if (tokenPayload && tokenPayload.rol) {   
                const { nombre, token } = tokenPayload;   
                    // Realizar acciones específicas según el rol del usuario
                if (tokenPayload.rol === 'medico') {
                  navigate('/InterfazMedico');
                  localStorage.setItem('nombre', tokenPayload.nombre);
                  localStorage.setItem('especialidad', tokenPayload.especialidad);
                  localStorage.setItem('id', tokenPayload._id);
                } else if (tokenPayload.rol === 'paciente') {
                  localStorage.setItem('token', token);
                  localStorage.setItem('numeroDocumento', tokenPayload.numeroDocumento);
                  localStorage.setItem('nombre', nombre);
                  localStorage.setItem('apellido', tokenPayload.apellido);
                  localStorage.setItem('correo', tokenPayload.correo);
                  localStorage.setItem('rol', tokenPayload.rol);
                  localStorage.setItem('id', tokenPayload._id);
                  navigate('/interfazPaciente');
                } else if(tokenPayload.rol === 'director') {
                  navigate('/ConsultarUsuarios');
              }
            }
          }
            setError('');
        } catch (error) {
          console.error('Error en el inicio de sesión:', error);
      
          if (error.response && error.response.data && error.response.data.msg) {
            setError('Error: ' + error.response.data.msg);
          } else {
            setError('Error en el inicio de sesión: ' + error.message);
          }
        }
      };

    return (
      <div>
        <Navbar></Navbar>
      
          <div className="login">
            <div className="login-box">
      <div className="login-logo">
        
      </div>
      <br/>
      
      <div className="card">
        <div className="card-body login-card-body">
          <h5 className="login-box-msg">BIENVENIDO A TU DOCTOR ONLINE</h5>
          {error && (
            <div className='mensajeE'>
            {error}
            </div>
        )}
          <form autoComplete='off' onSubmit={datosLogin}>            
            <div className="input-group mb-3">
              <input type="text" 
              className="form-control" 
              placeholder="Correo" 
              id="correo"
              name="correo"
              value={correo} 
              //para actualizar el estado de una variable 
              onChange={(e) => setCorreo(e.target.value)}
              required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>



            <div className="input-group mb-3">
              <input type="password" 
              className="form-control" 
              placeholder="Contraseña" 
              id="contraseña"
              name="contraseña"
              value={contraseña} 
              onChange={(e) => setCon(e.target.value)}
              required
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>

            <div className='control'>
              <input  className="btn btn-flex btn-primary md-2 ml-2 p-2" value="ingresar" type="submit"> 
              </input>
          </div>
            
          </form>

      

            

        </div>
      </div>
    </div>

    </div>
   
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      

      <Footer></Footer>
</div>

    )
}

export default Login2;