const apiUrl = process.env.DEV_URL || "http://localhost:8080"
type Borrow = {
  user_id: string | undefined,
  equipment_id: string | undefined,
  borrow_date: string,
  return_date: string
}

type RequestResponse = {
  error?: string,
  result?: string
}

export default async function addBorrow(borrow: Borrow): Promise<RequestResponse> {
  try {
    const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='))
    if (tokenCookie) {
      const tokenValue = tokenCookie.split('=')[1];
      if (tokenValue) {
        const token = tokenValue.trim();
        const resp = await fetch(`${apiUrl}/borrowing`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(borrow)
        })
        const serverResponse = await resp.json()
        if (!resp.ok) {
          return { error: `${serverResponse.error}` }
        }
        if (resp.status !== 201) {
          return { error: `${serverResponse.error}` }
        }
        return { result: "borrowed" }
      } else {
        return { error: "token no value" }
      }
    } else {
      return { error: "token not found" }
    }
  } catch (error) {
    return { error: `${error}` }
  }
}
