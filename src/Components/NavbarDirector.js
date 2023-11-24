import React from 'react'
import { Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.removeItem('name');
  window.location.href = '/';
};

const NavbarDirector = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg color">
        <Link to="/" className="navbar-brand titulo"> TDO | TU DOCTOR ONLINE</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="menu" />
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
        
            <li className="navbar-brand t1">
              <Link to="/ConsultarUsuarios" className="nav-link">USUARIOS</Link>
            </li>

            <li className="navbar-brand t1">
              <Link to="/RegisterPac" className="nav-link">REGISTRAR PACIENTES</Link>
            </li>
            <li className="navbar-brand t2">
              <Link to="/RegisterMedicos" className="nav-link">REGISTRAR MEDICOS | DIRECTORES</Link>
            </li>
            <li className="navbar-brand t2">
              <Link to="#" onClick={handleLogout} className="nav-link">CERRAR SESION</Link>
            </li>
          </ul>
        </div>
      </nav>

    </div>
  )
}

export default NavbarDirector