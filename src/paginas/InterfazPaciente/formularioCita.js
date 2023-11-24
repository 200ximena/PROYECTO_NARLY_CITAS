import React, { useState,useEffect } from 'react';
import axios from 'axios';
import NavbarCliente from '../../Components/NavbarCliente';
import Footer from '../../Components/Footer';
import '../../dist/css/registroCita.css'

const FormularioCita = () => {

      const [cita, setCita] = useState({
        numeroDocumento: '',
        nombre: '',
        apellido: '',
        correo: '',
        fecha: '',
        hora:'',
        numAutorizacion:'',
        medico:''
      });

      const [error, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
      const numeroDocumentoCita = localStorage.getItem('numeroDocumento');
      const nombreCita = localStorage.getItem('nombre');
      const apellidoCita = localStorage.getItem('apellido');
      const correoCita = localStorage.getItem('correo');

      const registroCita = async () => {
        try {
          const { numeroDocumento, nombre, apellido, correo, fecha,hora,numAutorizacion, medico } = cita;
      
          
          //http://localhost:8888/api/v1/devcamps/citas

            // Registrar la cita
        const responseCita = await axios.get(
          `http://localhost:8888/api/v1/devcamps/users/estados?rol=medico`
          );
        // Buscar doctores con disponibilidad
      const medicosDisponibles = responseCita.data.data;
  
      if (medicosDisponibles.length > 0) {
        const doctorId = medicosDisponibles[0]._id;

        const medicos = await axios.post(
          'http://localhost:8888/api/v1/devcamps/citas/registerCita',
        {
            numeroDocumento:numeroDocumentoCita,
            nombre:nombreCita,
            apellido:apellidoCita,
            correo:correoCita,
            fecha,
            hora,
            numAutorizacion,
            medico,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }else{
        setError("no hay medicos disponibles")
      }
            setSuccessMessage('Su cita fue registrada con exitosamente');
            setError('');
 
        } catch (error) {
          console.error('Error en el registro:', error);
      
          if (error.response) {
            console.log('Respuesta del servidor:', error.response);
            if (
              error.response.status === 500 &&
              error.response.data &&
              error.response.data.message
            ) {
              setError('Error: ' + error.response.data.message);
            } else {
              setError('Error al agendar su cita. Pueda que tega una cita agendada o la agenda ya no esta disponible');
            }
          } else {
            setError('Error en el : ' + error.message);
          }
        }
      };

    
      const onChange = (e) => {
        const { name, value } = e.target;
      
        // Actualiza el estado de cita según el campo que cambió
        setCita((prevCita) => ({
          ...prevCita,
          [name]: value,
        }));
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
        registroCita();
      };


            // Agrega un nuevo estado para almacenar la lista de doctores disponibles
  const [medicosDisponibles, setmedicosActivos] = useState([]);

  useEffect(() => {
    // Función asincrónica para obtener doctores disponibles
    const fetchmedico = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8888/api/v1/devcamps/users/estados?rol=medico'
        );
        
        if (response.data.success) {
          setmedicosActivos(response.data.data)
          
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Llama a la función para obtener doctores disponibles al cargar el componente
    fetchmedico();
  }, []); // La dependencia es un arreglo vacío para ejecutar solo una vez al montar el componente

  


  
  return (
    <div>
      <NavbarCliente></NavbarCliente>
      


        <div className="login-box registro">
          <div className="login-logo">
            
        </div>
<br/>

    <div className="card">
      <div className="card-body login-card-body">
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
        <h5 className="login-box-msg">REGISTRA TU CITA</h5>

        
        <form autoComplete='off' onSubmit={onSubmit}>

        <div className="input-group mb-3">
            <input type="number" className="form-control" 
            placeholder="Número de Documento" 
            id="numDocumento"
            name="numeroDocumento"
            value={numeroDocumentoCita}
            onChange={onChange}
            required
            readOnly
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-id-card" />
              </div>
            </div>
          </div>

    <div className="input-group mb-3">
        <input type="text" className="form-control" 
        placeholder="Nombre" 
        id="nombre"
            name="nombre"
            value={nombreCita}
            onChange={onChange}
            required
            readOnly
            />
        <div className="input-group-append">
          <div className="input-group-text">
          <span class="fas fa-user"></span>
          </div>
        </div>
      </div>

      <div className="input-group mb-3">
        <input type="text" className="form-control" 
        placeholder="Apellido" 
        id="apellido"
            name="apellido"
            value={apellidoCita}
            onChange={onChange}
            required
            readOnly
            />
        <div className="input-group-append">
          <div className="input-group-text">
          <span class="fas fa-user"></span>
          </div>
        </div>
      </div>


      <div className="input-group mb-3">
        <input type="email" className="form-control" 
        placeholder="Correo" 
        id="correo"
            name="correo"
            value={correoCita}
            onChange={onChange}
            required
            readOnly
            />
        <div className="input-group-append">
          <div className="input-group-text">
            <span className="fas fa-envelope" />
          </div>
        </div>
      </div>


      <div>
           <p>Marque fecha y hora</p>
      <div className="input-group mb-3">
            <input type="date" className="form-control" 
            
            placeholder="Fecha"
            id="Fecha"
            name="fecha"
            value={cita.fecha}
            onChange={onChange}
            required
            min={new Date().toISOString().split('T')[0]} // Establece la fecha actual(minimo)
            /> 
            <div className="input-group-append">
              
            </div>
          </div>
          </div>
          <div className="input-group mb-3">
            <input type="time"  className="form-control" 
            placeholder="Hora" 
            id="hora"
            name="hora"
            value={cita.hora}
            onChange={onChange}
            required
            min="07:00" // Establecer el valor mínimo como las 7:00 AM
            max="18:00" // Establecer el valor máximo como las 6:00 PM
            /> 
            <div className="input-group-append">
             
            </div>
          </div>

        <div className="input-group mb-3">
            <input type="number" className="form-control" 
            placeholder="Número de Autorizacion" 
            id="numAutorizacion"
            name="numAutorizacion"
            value={cita.numAutorizacion}
            onChange={onChange}
            required
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-id-card" />
              </div>
            </div>
        </div>

         {/* Agrega un bloque de código para mostrar la lista de doctores disponibles */}
         {medicosDisponibles.length > 0 && (
            <div className='input-group mb-3'>
              <div className="Medicos">
                <h5 className="login-box-msg">MEDICOS DISPONIBLES</h5>
                <select name="medico" onChange={onChange} className="form-control">
                  {medicosDisponibles.map((doctor) => (
                    <option key={doctor._id} value={doctor.nombre}>
                      {doctor.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

        <div className='control'>
              <button  className="btn btn-flex btn-primary md-2 ml-2 p-2" type="submit"value='Registrar' >
              <i className="fab mr-2" /> REGISTRAR CITA    
              </button>
          </div>
          
    </form>
    
      </div>
    </div>
    </div>

    <br>
    </br>
    <br>
    </br>

    <Footer></Footer>

    </div>
  )
}

export default FormularioCita