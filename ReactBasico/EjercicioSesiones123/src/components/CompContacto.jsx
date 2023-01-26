import React from 'react'
import Contacto from './Contacto'
import PropTypes from 'prop-types'

const CompContacto = (props) => {
  return (
    <div>{props.contacto.conectado ? "Contacto en línea" : "Contacto no disponible"}</div>
  );
};

CompContacto.propTypes = {
  contacto: PropTypes.instanceOf(Contacto)
};

export default CompContacto;