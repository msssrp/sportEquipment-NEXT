import axios from "axios"
const apiUrl = process.env.DEV_URL || "http://localhost:8080"
type User = {
  username: string,
  password: string
}

type UserRepo = {
  session: string
  user: {
    user_id: string,
    username: string,
    email: string,
    f_name: string,
    l_name: string,
    phone_number: string,
    address: string,
    roles: string[]
  }
}
type SignInResponse<T> = {
  error?: string,
  result?: T
}

export default async function signInUser(user: User): Promise<SignInResponse<UserRepo>> {
  try {
    const resp = await axios.post(`${apiUrl}/users/auth/signIn`, user)
    console.log(apiUrl)
    if (resp.status !== 200) {
      return { error: resp.data.error }
    }
    document.cookie = `refresh_token=${resp.data.refresh_token}`
    document.cookie = `token=${resp.data.access_token}`
    try {
      const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='))
      if (tokenCookie) {
        const tokenValue = tokenCookie.split('=')[1];

        if (tokenValue) {
          const token = tokenValue.trim();

          const userDataResp = await fetch(`${apiUrl}/users/byId`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          const dataResp = await userDataResp.json()
          if (userDataResp.status === 401) {
            return { error: `${dataResp.error}` }
          }
          return { result: dataResp }
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
