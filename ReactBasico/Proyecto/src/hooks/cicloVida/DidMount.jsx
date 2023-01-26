/**
 * Ejemplo de uso del método de ciclo de vida didMount.
 */

import React, { Component } from 'react'

export class DidMount extends Component {
    componentDidMount() {
        console.log('Comportamiento antes de que el componente sea añadido al DOM (render)');
    }
  render() {
    return (
      <div>
      <h1>DidMount</h1>
      </div>
    )
  }
}

export const MountHook = () => {
    useEffect(() => {
        console.log('Comportamiento antes de que el componente sea añadido al DOM (render)');
    }, [])
    
    return (
        <div>
        <h1>DidMount</h1>
        </div>
    )
}