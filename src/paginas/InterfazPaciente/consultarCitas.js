import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarCliente from '../../Components/NavbarCliente'
import Footer from '../../Components/Footer'
import '../../dist/css/interfazPaciente.css'

const ConsultarCitasP =({userName}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [citas, setCitas] = useState([]);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    
const [mensajeExito, setMensajeExito] = useState("");

    useEffect(() => {
      const fetchCitas = async () => {
        try {
          const numeroDocumento = localStorage.getItem('numeroDocumento');
          const response = await axios.get(`http://127.0.0.1:8888/api/v1/devcamps/citas/consultar/${numeroDocumento}`);
          setCitas(response.data.results);
        } catch (error) {
          console.error("Error al poder consultar las citas:", error);
        }
      };

      fetchCitas();
    }, []);

const handleEliminarC = async (citaId) => {
      const confirmacion = window.confirm("¿Seguro de que deseas eliminar esta cita?");
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





  return (
        <div>
            <NavbarCliente></NavbarCliente>
            <br />
            <br />
            <header className="text-black text-center header">
              <h1 className="display-4">MIS CITAS</h1>
              <p className="lead">Esta es tu cita agendada, recuerda que solo puedes agendar una o hasta que la registrada se consulte</p>
            </header>
            <br />
            <br />
            <br />
            <br />
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
                  <button className="btn btn-danger eliminar-button"onClick={() => handleEliminarC(cita._id)}>
                    Eliminar
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
            <br />
        <Footer></Footer>
    </div>

                           
            

  )
}

export default ConsultarCitasP
