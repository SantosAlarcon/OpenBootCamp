import React from 'react'
import { registerSW } from 'virtual:pwa-register/react';

const Actualizador = (props) => {
    const { onNeedRefresh, onOfflineReady } = props;

  return onNeedRefresh ? (
    <div>
    <div className='nueva-version'>
        Hay una nueva versión disponible de la aplicación. ¿Quieres actualizar?
        <div>
          <button onClick={actualizarSW}>Actualizar</button>
          <button onClick={this.onOfflineReady}>Cerrar</button>
        </div>
      </div>
    </div>
  ) : null
}

export default registerSW(Actualizador);