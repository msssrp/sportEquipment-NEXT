const apiUrl = process.env.DEV_URL || "http://localhost:8080"

type ResponseResp = {
  error?: string,
  result?: string
}

export default async function approveBorrow(borrowing_id: string, equipment_id: string): Promise<ResponseResp> {
  try {
    const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='))
    if (tokenCookie) {
      const tokenValue = tokenCookie.split('=')[1];
      if (tokenValue) {
        const token = tokenValue.trim();
        const reqBody = {
          borrowing_id: borrowing_id,
          equipment_id: equipment_id
        }
        const resp = await fetch(`${apiUrl}/borrowing/approveBorrowing`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody)
        })
        const serverResp = await resp.json()
        if (!resp.ok) {
          return { error: `${serverResp.error}` }
        }
        if (resp.status !== 200) {
          return { error: `${serverResp.error}` }
        }
        return { result: "approved!!" }
      } else {
        return { error: "token value is empty" }
      }
    } else {
      return { error: "token value is not found" }
    }
  } catch (error) {
    return { error: `${error}` }
  }
}
