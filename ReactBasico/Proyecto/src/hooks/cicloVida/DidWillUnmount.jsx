/**
 * Ejemplo de uso del método didWillUnmount para componente clase.
 * Ejemplo de uso de hooks para componente funcional
 * Esto se ejecuta cuando el componente va a desaparecer.
 */

import React, { Component, useEffect } from 'react'

export default class DidWillUnmount extends Component {
    componentWillUnmount() {
        console.log('Comportamiento antes de que el componente empiece a desaparecer.')
    }

  render() {
    return (
      <div>
      <h1>DidWillUnmount</h1>
      </div>
    )
  }
}

export const WillUnmountHook = () => {
    useEffect(() => {

        return () => {
            console.log('Comportamiento antes de que el componente empiece a desaparecer.')
        }

    }, []);

    return (
        <div>
            <h1>
                WillUnmount
            </h1>
        </div>
    )
}