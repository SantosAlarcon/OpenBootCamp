import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSessionStorage from '../hooks/useSessionStorage';
import axiosConfig from '../utils/config/axios.config';
import KataInfoPage from './KataInfoPage';

const KatasDetailPage = () => {
  const { id } = useParams();

  const [kataDetails, setKataDetails] = useState<Object>();

  const navigate = useNavigate();
  const token: any = useSessionStorage("sessionJWTToken");

  const config = {
    headers: {
      "x-access-token": token
    }
  }

  const getKataDetails = () => {
    axiosConfig.get(`/katas/?id=${id}`, config)
      .then(res => setKataDetails(res.data))
      .catch(error => console.log("No se pudo obtener el dato de la kata."))
  }

  useEffect(() => {

    // Si el usuario no ha iniciado sesión, se redirige a la página de Login.
    if (!token) {
      return navigate("/login");
    }
  }, [token])

  useEffect(() => {
    getKataDetails();
  }, [getKataDetails])

  return (
    <div>
      <h1>Detalles del kata {id}</h1>
      {kataDetails && (
        <KataInfoPage>{kataDetails}</KataInfoPage>
      )
      }
    </div>
  )
}

export default KatasDetailPage
