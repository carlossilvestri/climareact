import React, { useState } from "react";
import { Fragment } from "react";
import Error from "./Error";
import PropTypes from 'prop-types';
const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

  //State del error
  const [error, guardarError] = useState(false);
  // Extraer ciudad y pais.
  const { ciudad, pais } = busqueda;
  // Funcion que coloca los elementos en el state.
  const handleChange = (e) => {
    // Actualizar el state.
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };
  // Cuando un usuario da submit al form.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar
    if(ciudad.trim() === '' || pais.trim() === ''){
        guardarError(true);
        return;
    }
    guardarError(false);
    // Pasarlo al componente principal
    guardarConsultar(true);
  };
  return (
    <Fragment>
        { error ? <Error mensaje="Ambos campos son obligatorios."/> : null }
      <form onSubmit={handleSubmit}>
        <div className="input-field col s12">
          <input
            type="text"
            name="ciudad"
            id="ciudad"
            value={ciudad}
            onChange={handleChange}
          />
          <label htmlFor="ciudad">Ciudad: </label>
        </div>
        <div className="input-field col s12">
          <select name="pais" id="pais" value={pais} onChange={handleChange}>
            <option value="">-- Seleccione un país --</option>
            <option value="US">Estados Unidos</option>
            <option value="MX">México</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
            <option value="VE">Venezuela</option>
            <option value="ES">España</option>
            <option value="PE">Perú</option>
          </select>
          <label htmlFor="pais">País: </label>
        </div>
        <div className="input-field col s12">
            <input type="submit" value="Buscar Clima" className="waves-effect waves-light btn-large btn-block yellow accent-4"/>
        </div>
      </form>
    </Fragment>
  );
};
Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarBusqueda: PropTypes.func.isRequired,
    guardarConsultar: PropTypes.func.isRequired,
 }
export default Formulario;
