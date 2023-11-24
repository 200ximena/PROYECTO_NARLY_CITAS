import React from 'react'
import NavbarMedico from '../../Components/NavbarMedico'
import Footer from '../../Components/Footer'
import '../../dist/css/interfazMedico.css'

const InterfazMedico = () => {
  return (
    <div>
      <NavbarMedico></NavbarMedico>

      <header className="text-black text-center header">
        <h1 className="display-4">Bienvenido</h1>
        <p className="lead">Médico Especialista</p>
      </header>

      <div className="row mt-4">
          <div className="col-md-12 d-flex align-items-center justify-content-center">
            <div className="card text-center">
              <div className="card-body">
                <h2 className="card-title">Eres un profesional, nunca lo olvides</h2>
                <p className="card-text">Recuerda siempre consultar las citas que registran nuestros pacientes</p>
                {/* Puedes agregar más contenido según tus necesidades */}
              </div>
            </div>
          </div>
        </div>


      <div className="img1">
          <img src="https://plus.unsplash.com/premium_photo-1658506915122-d37e0d173c06?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="Servicio 1" />
      </div>


      <Footer></Footer>
    </div>
  )
}

export default InterfazMedico;
