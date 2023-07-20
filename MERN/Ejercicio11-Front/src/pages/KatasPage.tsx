import { useNavigate } from 'react-router-dom'
import useSessionStorage from '../hooks/useSessionStage';
import { useEffect } from 'react';

const KatasPage = () => {

  const navigate = useNavigate();
  const haIniciadoSesion = useSessionStorage("sessionJWTToken");

  useEffect(() => {

    // Si el usuario no ha iniciado sesión, se redirige a la página de Login.
    if (!haIniciadoSesion) {
      return navigate("/login");
    }
  }, [haIniciadoSesion])


  /**
   * Método para navegar por los detalles de la kata.
   * @param id ID de la kata.
   *
   */
  const navigateToKataDetail = (id: string) => {
    navigate(`/katas/${id}`);
  }

  return (
    <div>
      <h1>Lista de katas</h1>
    </div>
  )
}

export default KatasPage
