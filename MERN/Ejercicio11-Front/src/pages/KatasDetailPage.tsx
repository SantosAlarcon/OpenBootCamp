import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSessionStorage from '../hooks/useSessionStage';

const KatasDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const haIniciadoSesion: any = useSessionStorage("sessionJWTToken");

  useEffect(() => {

    // Si el usuario no ha iniciado sesión, se redirige a la página de Login.
    if (haIniciadoSesion === false) {
      return navigate("/login");
    }
  }, [haIniciadoSesion])



  return (
    <div>
      <h1>Detalles del kata {id}</h1>
    </div>
  )
}

export default KatasDetailPage
