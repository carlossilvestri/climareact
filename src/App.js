import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import Clima from "./componentes/Clima";
import Error from "./componentes/Error";
import Formulario from "./componentes/Formulario";
import Header from "./componentes/Header";

function App() {
  //State del formulario
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const [consultar, guardarConsultar] = useState(false);
  // eslint-disable-next-line
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  // Extraer ciudad y pais.
  const { ciudad, pais } = busqueda;
  // Estar pendiente del cambio de la variable consultar.
  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = "",
          url = "https://api.openweathermap.org/data/2.5/",
          urlCompleto = `${url}weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(urlCompleto);
        const resultadoResp = await respuesta.json();
        // eslint-disable-next-line
        guardarResultado(resultadoResp);
        console.log(resultadoResp);
        guardarConsultar(false);
        // Detecta si hubo resultados correctos en la consulta.
        if (resultadoResp.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  let componente;
  if(error){
    componente = <Error mensaje="No hay resultados"/>
  }else{
    componente = <Clima resultado={resultado}></Clima>

  }
  return (
    <Fragment>
      <Header titulo="Clima React App"></Header>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              ></Formulario>
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
