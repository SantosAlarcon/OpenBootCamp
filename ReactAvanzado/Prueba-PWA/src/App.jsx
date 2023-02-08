import { useState } from 'react'

import './App.css'

/* const actualizarSW = registerSW({
  onNeedRefresh() {
    return (
      <div className='nueva-version'>
        Hay una nueva versión disponible de la aplicación. ¿Quieres actualizar?
        <div>
          <button onClick={actualizarSW}>Actualizar</button>
          <button onClick={this.onOfflineReady}>Cerrar</button>
        </div>
      </div>
    )
  },
  onOfflineReady() {
    alert("Está lista la versión offline.")
  }
}) */

function App() {
  const [nuevoProducto, setNuevoProducto] = useState('');
  const [productos, setProductos] = useState(["Leche", "Cacao", "Avellanas", "Almendra"]);

  return (
    <div className="App">
      <h1>Lista de la compra V2</h1>

{/*       {<Actualizador />} */}

      <form onSubmit={(e) => e.preventDefault() | productos.push(nuevoProducto) | setNuevoProducto("")}>
        <input type="text" onChange={(e) => setNuevoProducto(e.target.value)} required placeholder='Introduce el nombre del producto' value={nuevoProducto} />
        <button type="submit">Añadir</button>
      </form>
      <ul>
        {productos.map((producto, index) => <li key={index}>{producto}</li>
        )}
      </ul>
    </div>
  )
}

export default App
