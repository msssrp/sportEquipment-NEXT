
const apiUrl = process.env.DEV_URL || "http://localhost:8080"

type ResponseResult = {
  error?: string,
  result?: string
}

export default async function deleteBorrowing(borrowingID: string, equipmentID: string): Promise<ResponseResult> {
  try {
    const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='))
    if (tokenCookie) {
      const tokenValue = tokenCookie.split('=')[1];
      if (tokenValue) {
        const token = tokenValue.trim();
        const resp = await fetch(`${apiUrl}/borrowing/${borrowingID}/${equipmentID}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })
        const serverResp = await resp.json()
        if (!resp.ok) {
          return { error: `${serverResp.error}` }
        }
        if (resp.status !== 200) {
          return { error: `${serverResp.error}` }
        }
        return { result: "deleted" }
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
