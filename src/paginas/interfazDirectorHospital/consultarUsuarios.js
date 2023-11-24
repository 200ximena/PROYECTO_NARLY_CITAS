import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarDirector from '../../Components/NavbarDirector'
import Modal from 'react-modal';
import Footer from '../../Components/Footer'

const ConsultarUsuarios = ({ userName }) => {
  // Definición de un estado 'users' y su función de actualización 'setUsers' con un valor inicial de un array vacío.
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [UsuarioAc, setUsuarioAc] = useState(null);
    const [Actualizacion, setActualizacion] = useState({
      nombre: '',
      apellido: '',
      tipoDocumento:'',
      numeroDocumento: '',
      correo: '',
      especialidad:'',
      estado:'',
      rol:''
  });
  const [mensajeExito, setMensajeExito] = useState("");
  
    useEffect(() => {
      const fetchUsuarios = async () => {
        try {
          // ruta
          const response = await axios.get("http://127.0.0.1:8888/api/v1/devcamps/users/consultar");
          setUsers(response.data.results);
        } catch (error) {
          console.error("Error al poder consultar los usuarios:", error);
        }
      };
  
      fetchUsuarios();
    }, []);
 

const handleEliminarPaciente = async (useriId) => {
    const confirmacion = window.confirm("¿Seguro de que deseas eliminar este paciente?");
    if (confirmacion) {
      try {
        await axios.delete(`http://localhost:8888/api/v1/devcamps/users/${useriId}`);
        const eliminarPaciente = users.filter((user) => user._id !== useriId);
        setUsers(eliminarPaciente);
        setMensajeExito("Su cita fue eliminada con éxito.");
      } catch (error) {
        console.error("Error al eliminar la cita:", error);
      }
    }
  };


    const handleActU = (userId) => {
    const user = users.find((user) => user._id === userId);
    setUsuarioAc(user);
    setActualizacion({
      nombre: user.nombre,
      apellido: user.apellido,
      tipoDocumento:user.tipoDocumento,
      numeroDocumento: user.numeroDocumento,
      correo: user.correo,
      especialidad: user.especialidad,
      estado:user.estado,
      rol:user.rol
    });
    openModal();
      
    };
    
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUsuarioAc(null);
    setActualizacion({
      nombre: '',
      apellido: '',
      tipoDocumento:'',
      numeroDocumento: '',
      correp: '',
      especialidad:'',
      estado:'',
      rol:''
    });
  };

  const handleActUser = async () => {
    try {
      
      await axios.put(`http://localhost:8888/api/v1/devcamps/users/${UsuarioAc._id}`, Actualizacion);
      const actualizaU = users.map((user) => {
        if (user._id === UsuarioAc._id) {
          return {
            ...user,
            ...Actualizacion
          };
        }
        return user;
      });

      setUsers(actualizaU);
      closeModal();
      setMensajeExito("El usuario se ha actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  const handleChangeActualizacion = (e) => {
  setActualizacion({
    ...Actualizacion,
    [e.target.name]: e.target.value
  });
};

  const handleCerrarMensajeExito = () => {
    setMensajeExito("");
  };



  return (
    <div>
        <NavbarDirector></NavbarDirector>


        <div className="table-responsive">
        <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Tipo_Documento</th>
            <th>Num_Documento</th>
            <th>Correo</th>
            <th>especialidad</th>
            <th>estado</th>
            <th>rol</th>
          </tr>
        </thead>
        <tbody>
        
        {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.tipoDocumento}</td>
              <td>{user.numeroDocumento}</td>
              <td>{user.correo}</td>
              <td>{user.especialidad}</td>
              <td>{user.estado}</td>
              <td>{user.rol}</td>
              <td>
              <button className="btn btn-danger eliminar-button" onClick={() => handleEliminarPaciente(user._id)}>
                Eliminar
            </button>
              </td>
              <td>
              <button className="btn btn-primary eliminar-button" onClick={() => handleActU(user._id)}>
                ACTUALIZAR
            </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Editar Usuario"
        >
          {UsuarioAc && (
            <div className="modal-content">
              <h2>Editar Usuario</h2><br/>
              <input
                type="text"
                name="nombre"
                value={Actualizacion.nombre}
                onChange={handleChangeActualizacion}
              /><br/><br/>
              <input
                type="text"
                name="apellido"
                value={Actualizacion.apellido}
                onChange={handleChangeActualizacion}
              /><br/><br/>
              <input
                type="text"
                name="tipoDocumento"
                value={Actualizacion.tipoDocumento}
                onChange={handleChangeActualizacion}
              /><br/><br/>
              <input
                type="text"
                name="numeroDocumento"
                value={Actualizacion.numeroDocumento}
                onChange={handleChangeActualizacion}
              /><br/><br/>
              <input
                type="text"
                name="correo"
                value={Actualizacion.correo}
                onChange={handleChangeActualizacion}
              /><br/><br/>
              <input
                type="text"
                name="especialidad"
                value={UsuarioAc.especialidad}
                onChange={handleChangeActualizacion}
              /><br/><br/>
              <input
                type="text"
                name="estado"
                value={Actualizacion.estado}
                onChange={handleChangeActualizacion}
              /><br/><br/>
              <input
                type="text"
                name="rol"
                value={Actualizacion.rol}
                onChange={handleChangeActualizacion}
              /><br/><br/>
              <button onClick={handleActUser}>Actualizar</button><br/>
              <button onClick={closeModal}>Cerrar</button>
              </div>
          )}
        </Modal>
      </div>
      </div>
      <Footer></Footer>
      </div>
     

  )
}

export default ConsultarUsuarios