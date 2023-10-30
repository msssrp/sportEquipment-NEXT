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
    const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    if (!tokenCookie) {
      return { error: 'Token not found' };
    }

    const tokenValue = tokenCookie.split('=')[1]?.trim();
    if (!tokenValue) {
      return { error: 'Token has no value' };
    }

    const token = tokenValue;
    const resp = await fetch(`${apiUrl}/borrowing`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(borrow),
    });

    if (!resp.ok) {
      if (resp.status === 401) {
        const refreshToken = document.cookie.split(';').find((c) => c.trim().startsWith('refresh_token'))?.split('=')[1]?.trim();
        if (!refreshToken) {
          return { error: 'Refresh token not found' };
        }

        const refreshTokenResp = await fetch(`${apiUrl}/users/auth/refreshToken`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (!refreshTokenResp.ok) {
          return { error: 'Failed to refresh token' };
        }

        const serverResp = await refreshTokenResp.json();
        document.cookie = 'token=;';
        document.cookie = `token=${serverResp.newAccessToken}`;


        return await addBorrow(borrow);
      }

      const serverResponse = await resp.json();
      return { error: serverResponse.error || 'Request failed' };
    }

    return { result: 'borrowed' };
  } catch (error) {
    return { error: `${error}` };
  }
}
