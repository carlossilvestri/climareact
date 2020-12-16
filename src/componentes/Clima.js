import React from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const Clima = ({resultado}) => {
    // Extraer los valores
    const { name, main } = resultado;
    if(!name) return null;
    // Grados kelvin
    const kelvin = 273.15;
    return ( 
    <Fragment>
        <div className="card-panel white col s12">
            <h2>El clima de {name} es: </h2>
            <p className="temperatura"> { parseFloat(main.temp - kelvin, 10).toFixed(2)} <span> &#x2103; </span> </p>
            <p>Temperatura Máxima: 
            { parseFloat(main.temp_max - kelvin, 10).toFixed(2)} <span> &#x2103; </span>
            </p>
            <p>Temperatura Mínima: 
            { parseFloat(main.temp_min - kelvin, 10).toFixed(2)} <span> &#x2103; </span>
            </p>
        </div>
    </Fragment>
    );
}
 Clima.propTypes = {
    resultado: PropTypes.object.isRequired
 }
export default Clima;