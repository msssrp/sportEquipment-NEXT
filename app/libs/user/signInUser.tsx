import axios from "axios"
const apiUrl = process.env.DEV_URL || "http://localhost:8080"
type User = {
  username: string,
  password: string
}

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

type ErrorData = {
  error: string
}

type SignInResponse = UserRepo | ErrorData

export default async function signInUser(user: User): Promise<SignInResponse | undefined> {
  try {
    const resp = await axios.post(`${apiUrl}/users/auth/signIn`, user)
    console.log(apiUrl)
    if (resp.status !== 200 || resp.data.error) {
      return { error: resp.data.error }
    }
    document.cookie = `token=${resp.data.token}`
    try {
      const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='))
      if (tokenCookie) {
        const tokenValue = tokenCookie.split('=')[1];

        if (tokenValue) {
          const token = tokenValue.trim();

          const userDataResp = await axios.get<UserRepo>(`${apiUrl}/users/byId`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          return userDataResp.data
        } else {
          return { error: "token value is empty" }
        }
      } else {
        return { error: "token value is not found" }
      }
    } catch (error: any) {
      return { error: error.response.data.error }
    }

  } catch (error: any) {
    return { error: error.response.data.error }
  }
}
