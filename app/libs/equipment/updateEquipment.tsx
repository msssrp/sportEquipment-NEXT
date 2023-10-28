const apiUrl = process.env.DEV_URL || "http://localhost:8080"
type Equipment = {
  name: string,
  category: string,
  description: string,
  quantity_available: string,
  condition: string,
  image_url: string,
}

type RequestResponse = {
  error?: string,
  result?: string
}

export default async function updateEquipment(id: string | string[], equipment: Equipment): Promise<RequestResponse> {
  try {
    const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='))
    if (tokenCookie) {
      const tokenValue = tokenCookie.split('=')[1];
      if (tokenValue) {
        const token = tokenValue.trim();
        const resp = await fetch(`${apiUrl}/equipment/${id}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(equipment)
        })
        const serverResponse = await resp.json()
        if (!resp.ok) {
          return { error: `${serverResponse.error}` }
        }
        if (resp.status !== 200) {
          return { error: `${serverResponse.error}` }
        }
        return { result: "updated" }
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
