import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api", // La URL base donde recibirá las peticiones
  responseType: "json",
  timeout: 6000
})
