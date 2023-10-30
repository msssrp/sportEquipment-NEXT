const apiUrl = process.env.DEV_URL || "http://localhost:8080"
type RequestResponse = {
  error?: string,
  success?: string
}

export default async function verifySession(sessionKey: string | string[] | undefined): Promise<RequestResponse> {
  try {
    const resp = await fetch(`${apiUrl}/users/auth/session`, {
      method: "GET",
      headers: {
        "sessionToken": `${sessionKey}`
      }
    })
    const serverResp = await resp.json()
    if (!resp.ok) {
      return { error: `${serverResp.error}` }
    }
    if (resp.status !== 200) {
      return { error: `${serverResp.error}` }
    }
    return { success: `${serverResp.message}` }
  } catch (error) {
    return { error: `${error}` }
  }
}
