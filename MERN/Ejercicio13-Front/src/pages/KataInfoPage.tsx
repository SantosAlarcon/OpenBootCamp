import useSessionStorage from "../hooks/useSessionStorage"
import axiosConfig from "../utils/config/axios.config"

const KataInfoPage = ({ children }: any) => {

  const token = useSessionStorage("sessionJWTToken");
  const config = {
    headers: {
      "x-access-token": token
    }
  }
  const fetchUserName = async (id: string) => {
    const nombre = await axiosConfig.get(`/users/?id=${id}`, config)
      .then((res) => res.data.name)

    return nombre;
  }

  return (
    <div>
      <h4>Nombre: </h4>{children.name}
      <h4>Description: </h4>{children.description}
      <h4>Fecha de creación: </h4>{new Date(children.date).toLocaleDateString()}
      <h4>Número de intentos: </h4>{children.chances}
      <h4>Difícultad: </h4>{children.level}
      <h4>Creador del kata: </h4>{fetchUserName(children.creator)}
    </div>
  )
}

export default KataInfoPage
