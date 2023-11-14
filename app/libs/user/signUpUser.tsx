const apiUrl = process.env.NEXT_PUBLIC_PUBLIC_API_URL
type User = {
  f_name: string,
  l_name: string,
  username: string,
  password: string,
  email: string,
  phone_number: string,
  address: string,
}

type ReqResult = {
  error?: string,
  statusText?: string
}

export default async function SignUpUser(user: User): Promise<ReqResult> {
  try {
    const resp = await fetch(`${apiUrl}/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (!resp.ok) {
      const serverError = await resp.json()
      return { error: `${serverError.error}` }
    }
    if (resp.status === 500) {
      const serverError = await resp.json()
      return { error: `${serverError.error}` }
    }
    const result = await resp.json()
    return { statusText: `${result.message}` }
  } catch (error) {
    return { error: `${error}` }
  }
}
