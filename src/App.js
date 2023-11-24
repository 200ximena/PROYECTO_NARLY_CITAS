import React,{Fragment} from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Login2 from './paginas/auth/login';
import Register from './paginas/auth/registro';
import InterfazPaciente from './paginas/InterfazPaciente/interfazPaciente';
import RegisterPac from './paginas/interfazDirectorHospital/registroPacientes'
import ConsultarCitasP from './paginas/InterfazPaciente/consultarCitas'
import ConsultarUsuarios from './paginas/interfazDirectorHospital/consultarUsuarios'

import Home from './paginas/Home';
import InterfazMedico from './paginas/InterfazMedico.js/interfazMedico';
import ConsultarCitas from './paginas/InterfazMedico.js/consultarCitas';
import PerfilMedico from './paginas/InterfazMedico.js/perfilMedico';
import FormularioCita from './paginas/InterfazPaciente/formularioCita';
import RegisterMedicos from './paginas/interfazDirectorHospital/registroMedicos';


function App() {
  return (
    <Fragment>
    <Router>
      <Routes>
        
        <Route path="/" exact element= {<Home/>}>
        </Route>
        <Route path="/login" exact element= {<Login2/>}>
        </Route>
        <Route path="/register" exact element= {<Register/>}>
        </Route>
        <Route path="/registerPaciente" exact element= {<Register/>}>
        </Route>
        <Route path="/RegisterMedicos" exact element= {<RegisterMedicos/>}>
        </Route>
        <Route path="/RegisterPac" exact element= {<RegisterPac/>}>
        </Route>
        
        <Route path="/InterfazPaciente" exact element= {<InterfazPaciente/>}>
        </Route>
        <Route path="/InterfazMedico" exact element= {<InterfazMedico/>}>
        </Route>

  

        <Route path="/FormularioCita" exact element= {<FormularioCita/>}>
        </Route>

        <Route path="/ConsultarCitasMedico" exact element= {<ConsultarCitas/>}>
        </Route>

        <Route path="/ConsultarCitasP" exact element= {<ConsultarCitasP/>}>
        </Route>
        <Route path="/ConsultarUsuarios" exact element= {<ConsultarUsuarios/>}>
        </Route>
        
        <Route path="/PerfilMedico" exact element= {<PerfilMedico/>}>
        </Route>

       

      </Routes>
    </Router>
  </Fragment>

  

  );
}

export default App;