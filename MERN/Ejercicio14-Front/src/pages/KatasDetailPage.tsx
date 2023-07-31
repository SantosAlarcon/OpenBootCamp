import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSessionStorage from '../hooks/useSessionStorage';
import { getKataByID } from '../services/katasService';
import { AxiosResponse } from 'axios';
import { Kata } from '../types/Kata.type';
import Editor from '../components/editor/Editor';
import { getStarAverage } from '../utils/getStarAverage';

const KatasDetailPage = () => {
  const { id } = useParams();

  const [kata, setKata] = useState<Kata | undefined>();
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const navigate = useNavigate();
  const token: any = useSessionStorage("sessionJWTToken");

  useEffect(() => {

    // Si el usuario no ha iniciado sesión, se redirige a la página de Login.
    if (!token) {
      return navigate("/login");
    } else {

      if (id) {
        getKataByID(token, id).then((response: AxiosResponse) => {

          if (response.status === 200 && response.data) {
            let kataData: Kata = {
              _id: response.data._id,
              name: response.data.name,
              description: response.data.description,
              stars: getStarAverage(response.data.stars),
              level: response.data.level,
              chances: response.data.chances,
              creator: response.data.creator,
              solution: response.data.solution,
              participants: response.data.participants
            }

            setKata(kataData);
          }

        }).catch((error) => console.log(`[ERROR A LA HORA DE OBTENER LOS DATOS DEL KATA]: ${error}`))
      } else {
        return navigate("/katas");
      }
    }
  }, [token])

  return (
    <div>
      <h1>Detalles del kata {id}</h1>

      {
        kata ? (
          <div className='kata-data'>
            <h2>{kata?.description}</h2>
            <h3>Valoración: {kata?.stars}/5</h3>
            <button onClick={() => setShowSolution(!showSolution)}>
              {showSolution ? 'Ocultar solución' : "Mostrar solución"}
            </button>

            {showSolution && (
              <Editor solution={kata?.solution}></Editor>
            )}
          </div>
        ) : (
          <div>
            <h2>Cargando datos...</h2>
          </div>
        )
      }

    </div>
  )
}

export default KatasDetailPage
