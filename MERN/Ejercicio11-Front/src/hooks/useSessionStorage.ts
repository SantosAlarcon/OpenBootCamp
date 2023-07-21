const useSessionStorage = (key: string) => {

  // Se lee el valor almacenado en el almacén de sesión.
  const valorAlmacenado = sessionStorage.getItem(key);

  // Se devuelve el valor almacenado si ya existe en el almacén.
  if (valorAlmacenado) {
    return valorAlmacenado;
  }

}

export default useSessionStorage
