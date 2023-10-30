const apiUrl = process.env.DEV_URL || "http://localhost:8080"

type UserRoles = {
  roles: string[]
}

type RequestResponse<T> = {
  error?: string,
  result?: T
}

export default async function verifyUserRoles(userID: string | string[] | undefined): Promise<RequestResponse<UserRoles>> {
  try {
    const resp = await fetch(`${apiUrl}/users/auth/userRoles/${userID}`, {
      method: "GET"
    })
    const serverResp = await resp.json()
    if (!resp.ok) {
      return { error: `${serverResp.error}` }
    }
    if (resp.status !== 200) {
      return { error: `${serverResp.error}` }
    }
    return { result: serverResp }
  } catch (error) {
    return { error: `${error}` }
  }
}
