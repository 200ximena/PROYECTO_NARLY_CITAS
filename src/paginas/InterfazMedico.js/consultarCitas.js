import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarMedico from '../../Components/NavbarMedico'
import Footer from '../../Components/Footer'

const ConsultarCitasMedico =({userName}) => {
  const [citas, setCitas] = useState([]);
  
const [mensajeExito, setMensajeExito] = useState("");

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const nombre = localStorage.getItem('nombre');
        const response = await axios.get(`http://127.0.0.1:8888/api/v1/devcamps/citas/consultarM/${nombre}`);
        console.log('Respuesta de la API:', response.data);
        setCitas(response.data.results);
      } catch (error) {
        console.error("Error al poder consultar las citas:", error);
      }
    };

    fetchCitas();
  }, []);

const handleEliminarC = async (citaId) => {
    const confirmacion = window.confirm("¿Seguro de que ya consulto esta cita esta cita?");
    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:8888/api/v1/devcamps/citas/${citaId}`);
        const eliminarCita = citas.filter((cita) => cita._id !== citaId);
        setCitas(eliminarCita);
        setMensajeExito("Su cita fue eliminada con éxito.");
      } catch (error) {
        console.error("Error al eliminar la cita:", error);
      }
    }
  };


  const handleCerrarMensajeExito = () => {
    setMensajeExito("");
  };



   const nombre=localStorage.getItem('nombre')

return (
      <div>
          <NavbarMedico></NavbarMedico>
           <br />
          <header className="text-black text-center header">
              <h4 className="display-4">MIS CITAS AGENDADAS</h4>
              <p className="lead">Estas son las citas de tu agenda, no olvides consultarlas</p>
            </header>
            <br />
            <br />
      <div className="table-responsive">
        <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Número de Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Fecha de Cita</th>
            <th>Hora de Cita</th>
            <th>Numero Autorizacion</th>
            <th>Medico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
        
        {citas.map((cita, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{cita.numeroDocumento}</td>
              <td>{cita.nombre}</td>
              <td>{cita.apellido}</td>
              <td>{cita.correo}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.numAutorizacion}</td>
              <td>{cita.medico}</td>
              <td>
                <button className="btn btn-danger eliminar-button" onClick={() => handleEliminarC(cita._id)}>
                  Consultar cita
                </button>
              </td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />

<Footer></Footer>

    </div>
  )
}

export default ConsultarCitasMedico;