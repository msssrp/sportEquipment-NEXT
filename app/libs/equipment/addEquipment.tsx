const apiUrl = process.env.DEV_URL || "http://localhost:8080"
import axios from "axios"
type Equipment = {
  name: string,
  category: string,
  description: string,
  quantity_available: string,
  condition: string,
  image_url: string,
}
export default async function addEquipment(equipment: Equipment): Promise<string> {
  try {
    const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='))
    if (tokenCookie) {
      const tokenValue = tokenCookie.split('=')[1];
      if (tokenValue) {
        const token = tokenValue.trim();
        const resp = await axios.post(`${apiUrl}/equipment`, equipment, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        if (resp.status !== 201) {
          return resp.data.error
        }
      } else {
        return "token value is empty"
      }
    } else {
      return "token value is not found"
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return "Invalid token ensure that you already login"
    }
    return "An error occurred while processing your request"
  }
  return "added"
}
