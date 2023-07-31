import axiosConfig from "../utils/config/axios.config";

export const getAllKatas = (token: string, limit?: number, page?: number) => axiosConfig.get("/katas", {
  headers: {
    "x-access-token": token
  },
  params: {
    limit,
    page
  }
})

export const getKataByID = (token: string, id: string) => axiosConfig.get("/katas", {
  headers: {
    "x-access-token": token
  },
  params: {
    id
  }
})
