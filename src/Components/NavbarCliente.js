import React from 'react'
import { Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.removeItem('name');
  window.location.href = '/';
};

const NavbarCliente = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg color">
  <Link to="/InterfazPaciente" className="navbar-brand titulo"> TDO | TU DOCTOR ONLINE</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="menu" />
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="navbar-brand t1">
        <Link to="/InterfazPaciente" className="nav-link">INICIO</Link>
      </li>
      <li className="navbar-brand t1">
        <Link to="/formularioCita" className="nav-link">REGISTRAR UNA CITA</Link>
      </li>
      <li className="navbar-brand t2">
        <Link to="/ConsultarCitasP" className="nav-link">MIS CITAS</Link>
      </li>
      <li className="navbar-brand t3">
        <Link to="#" onClick={handleLogout} className="nav-link">CERRAR SESION</Link>
      </li>
    </ul>
  </div>
</nav>

    </div>
  )
}

export default NavbarCliente