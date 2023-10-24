const apiUrl = process.env.DEV_URL
import axios from "axios"
type UserRepo = {
  user_id: string,
  username: string,
  email: string,
  f_name: string,
  l_name: string,
  phone_number: string,
  address: string,
  roles: string[]
}

export default async function getUserByID(id: string | undefined): Promise<UserRepo | undefined> {
  if (id) {
    const resp = await axios.get(`${apiUrl}/users/byID/${id}`)
    const user = resp.data
    return user
  }
  return undefined
}
