const apiUrl = process.env.NEXT_PUBLIC_PUBLIC_API_URL

type Repo = {
  equipment: {
    name: string,
    category: string,
    description: string,
    quantity_available: string,
    condition: string,
    image_url: string,
    borrowing_id?: string,
    user_id?: string,
    equipment_id?: string,
    borrow_date?: string,
    return_date?: string,
    days_left?: string,
    status?: string
  }
}[]


export default async function getEquipments(): Promise<Repo> {
  const resp = await fetch(`${apiUrl}/equipment`, {
    method: 'GET',
    cache: "no-store",
  })
  const data = await resp.json()
  return data
}
