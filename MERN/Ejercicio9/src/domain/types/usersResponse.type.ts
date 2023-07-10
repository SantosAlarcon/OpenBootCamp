import { IUser } from "../../controller/interfaces/IUser.interface"

export type usersResponse = {
  users: IUser[],
  totalPages: number,
  currentPage: number
}
