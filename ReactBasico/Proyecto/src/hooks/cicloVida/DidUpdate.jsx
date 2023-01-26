/**
 * Ejemplo de uso del método de ciclo de vida didUpdate en componente de
 * clase y uso de hook en componente funcional.
 */

import React, { Component, useEffect } from 'react'

export class DidUpdate extends Component {
  componentDidUpdate() {
    console.log('Comportamiento cuando el componente recibe nuevos props o cambia su estado.');
  }
  render() {
    return (
      <div>
        <h1>DidUpdate</h1>
      </div>
    )
  }
}

export const UpdateHook = () => {
  useEffect(() => {
    console.log('Comportamiento cuando el componente recibe nuevos props o cambia su estado.');
  });

  return (
    <div>
      <h1>DidUpdate</h1>
    </div>
  )
}