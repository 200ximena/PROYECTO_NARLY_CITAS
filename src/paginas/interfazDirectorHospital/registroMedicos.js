import React, { useState } from "react";
import axios from "axios"
import NavbarDirector from '../../Components/NavbarDirector'
import Footer from '../../Components/Footer'
import '../../dist/css/registroCita.css'


    

const RegisterMedicos = () => {

    const [user, setUsuario] = useState({
      nombre:'',
      apellido: '',
      tipoDocumento: '',
      numeroDocumento: '',
      correo: '',
      contraseña: '',
      especialidad:'',
      estado:'',
      rol:''
  })
  
  const { nombre, apellido,tipoDocumento, numeroDocumento, correo,contraseña,especialidad,estado,rol } = user;
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleRegister = async () => {
      try {
  
        const response = await axios.post(
          'http://localhost:8888/api/v1/devcamps/users/register',
          {
            ...user
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
          setSuccessMessage('Usuario creado con éxito');
          setError('');
      } catch (error) {
          if (error.response) {
              console.log('Respuesta del servidor:', error.response);
              if (error.response.data && error.response.data.message) {
                  setError('Error: ' + error.response.data.message);
              } else {
                  setError('Error al registrar: ' + error.message);
              }
          } else {
              setError('Error al registrar: ' + error.message);
          }
      }
  };
  const onChange = (e) => {
      setUsuario({
          ...user,
          [e.target.name]: e.target.value
      });
  }
  
  
  
  const onSubmit = (e) => {
      e.preventDefault();
      handleRegister()
  };

  return (
    <div>
      <NavbarDirector></NavbarDirector>

    <div class="login">
    <div className="login-box">
<div className="login-logo">

</div>
<br/>

{successMessage && (
      <div className='mensajeE'>
          {successMessage}
      </div>
      )}
      {error && (
          <div className='mensajeError'>
          {error}
          </div>
      )}

<div className="card">
    <div className="card-body login-card-body">
      <h5 className="login-box-msg">Ingrese los datos solicitados</h5>
      
      <form onSubmit={onSubmit}>

        <div className="input-group mb-3">
          <input type="text" 
          className="form-control" 
          placeholder="Nombre " 
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={onChange}
          required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>

        <div className="input-group mb-3">
          <input type="text" 
          className="form-control" 
          placeholder="Apellido"
          id="apellido"
          name="apellido"
          value={apellido}
          onChange={onChange}
          required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>


        <select name="tipoDocumento" value={tipoDocumento} onChange={onChange} className="form-control" required>
                  <option value="na" selected hidden>Tipo De Documento</option>
                  <option value="ti">Cedula de ciudadania</option>
                  <option value="cc">pasaporte</option>
        </select>

        <br />

        <div className="input-group mb-3">
          <input type="text" 
          className="form-control" 
          placeholder="Número de Documento" 
          id="numeroDocumento"
          name="numeroDocumento"
          minLength="6"
          value={numeroDocumento}
          onChange={onChange}
          required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-id-card" />
            </div>
          </div>
        </div>

        

        <div className="input-group mb-3">
          <input type="email" 
          className="form-control" 
          placeholder="Correo" 
          id="correo"
          name="correo"
          value={correo}
          onChange={onChange}
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
          minLength="6"
          value={contraseña}
          onChange={onChange}
          required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>

        <div className="input-group mb-3">
          <input type="text" 
          className="form-control" 
          placeholder="especialidad " 
          id="especialidad"
          name="especialidad"
          value={especialidad}
          onChange={onChange}
          required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>

        <div className="input-group mb-3">
          <input type="text" 
          className="form-control" 
          placeholder="Estado " 
          id="estado"
          name="estado"
          value={estado}
          onChange={onChange}
          required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user" />
            </div>
          </div>
        </div>


        <select name="rol" value={rol} onChange={onChange} className="form-control" required>
                  <option value="na" selected hidden>Elija un rol</option>
                  <option value="director">Director</option>
                  <option value="medico">Medico</option>
        </select>

        <br />

      <div className='control'>
      <button  className="btn btn-flex btn-primary md-2 ml-2 p-2" type="submit">
            <i className="fab mr-2" /> REGISTRAR    
            </button>
      </div>
      
      </form>
      </div>
    </div>
  </div>
  </div>

<br>
    </br>
    <br>
    </br>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br /><br />
    
    

    <Footer></Footer>
</div>
  )
}
export default RegisterMedicos