import axios from "axios"

const apiUrl = process.env.DEV_URL || "http://localhost:8080"


export default async function deleteEquipment(equipmentID: string | undefined): Promise<string | undefined> {
  try {
    const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='))
    if (tokenCookie) {
      const tokenValue = tokenCookie.split('=')[1];
      if (tokenValue) {
        const token = tokenValue.trim();
        const resp = await axios.delete(`${apiUrl}/equipment/${equipmentID}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        if (resp.status !== 200) {
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
    } else {
      return "An error occurred while processing your request"
    }
  }

  return "deleted"
}
