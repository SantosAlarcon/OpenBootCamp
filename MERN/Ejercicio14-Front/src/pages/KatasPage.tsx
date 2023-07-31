import { useNavigate } from 'react-router-dom'
import useSessionStorage from '../hooks/useSessionStorage';
import { useEffect, useState } from 'react';
import { getAllKatas } from '../services/katasService';
import { AxiosResponse } from 'axios';
import { Kata } from '../types/Kata.type';

const KatasPage = () => {
  const [katas, setKatas] = useState<Kata[]>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  const token = useSessionStorage("sessionJWTToken");

  useEffect(() => {

    // Si el usuario no ha iniciado sesión, se redirige a la página de Login.
    if (!token) {
      return navigate("/login");
    } else {
      getAllKatas(token, 2, 1)
        .then((response: AxiosResponse) => {

          if (response.status === 200 && response.data.katas && response.data.currentPage && response.data.totalPages) {
            console.table(response.data);

            let { katas, currentPage, totalPages } = response.data;

            setKatas(katas);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
          } else {
            throw new Error("Error al obtener los katas.");
          }

        }).catch(error => console.error(`[Error al obtener todas las katas]: ${error}`));
    }
  }, [token])

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
        {katas?.map((kata: Kata) => (
          <li key={kata._id}><a onClick={() => navigateToKataDetail(kata._id)}>{kata.name}</a></li>
        ))}
      </ul>
    </div>
  )
}

export default KatasPage
