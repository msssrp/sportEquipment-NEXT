const apiUrl = process.env.NEXT_PUBLIC_API_URL

type Equipment = {
  name: string,
  category: string,
  description: string,
  quantity_available: string,
  condition: string,
  image_url: string,
}

type RequestResponse<T> = {
  error?: string,
  result?: T
}

export default async function getEquipmentByID(id: string | string[]): Promise<RequestResponse<Equipment>> {
  try {
    const resp = await fetch(`${apiUrl}/equipment/${id}`, {
      method: "GET",
      cache: "no-cache"
    })
    const serverResponse = await resp.json()
    if (!resp.ok) {
      return { error: `${serverResponse.error}` }
    }
    if (resp.status !== 200) {
      return { error: `${serverResponse.error}` }
    }
    return { result: serverResponse }
  } catch (error) {
    return { error: `${error}` }
  }
}
