const apiUrl = process.env.DEV_URL || "http://localhost:8080"

type Borrow = {
  borrowing_id: string,
  user_id: string,
  equipment_id: string,
  borrow_date: string,
  return_date: string,
  days_left: number,
  status: string
}[]

type RequestResult<T> = {
  error?: string,
  result?: T
}

export default async function getBorrowsByUserID(userID: string): Promise<RequestResult<Borrow>> {
  try {
    const resp = await fetch(`${apiUrl}/borrowing/getByUser/${userID}`, {
      method: "GET",
      cache: "no-cache",

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
