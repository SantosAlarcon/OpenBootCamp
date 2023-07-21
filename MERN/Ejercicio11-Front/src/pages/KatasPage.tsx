import { useNavigate } from 'react-router-dom'
import useSessionStorage from '../hooks/useSessionStorage';
import { useEffect, useState } from 'react';
import axiosConfig from '../utils/config/axios.config';

const KatasPage = () => {
  const [katas, setKatas] = useState<object>();

  const navigate = useNavigate();
  const token = useSessionStorage("sessionJWTToken");

  const config = {
    headers: {
      "x-access-token": token,
    }
  }

  const fetchKatas = () => {
    axiosConfig.get("/katas", config)
      .then((res: any) => setKatas(res.data.katas))
      .catch((error) => console.error("Error al hacer fetching"));
  }

  useEffect(() => {

    // Si el usuario no ha iniciado sesión, se redirige a la página de Login.
    if (!token) {
      return navigate("/login");
    }
  }, [token])

  useEffect(() => {
    fetchKatas()

  }, [fetchKatas])


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
      <ul>
        {katas?.map((kata: any) => (
          <li key={kata._id}><a onClick={() => navigateToKataDetail(kata._id)}>{kata.name}</a></li>
        ))}
      </ul>
    </div>
  )
}

export default KatasPage
