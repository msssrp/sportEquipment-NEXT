const apiUrl = process.env.DEV_URL
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
    const resp = await fetch(`${apiUrl}/users/byID/${id}`, {
      method: "GET",
      next: { revalidate: 3 }
    })
    const user = resp.json()
    return user
  }
  return undefined
}
