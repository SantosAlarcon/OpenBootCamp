import React from 'react'
import {Usuario} from '../../models/claseUsuario'
import propTypes from 'prop-types'

export const PaginaPerfil = ({usuario}) => {
  return (
    <div>PaginaPerfil</div>
  )
}

PaginaPerfil.propTypes = {
    usuario: propTypes.instanceOf(Usuario).isRequired
}

export default PaginaPerfil;