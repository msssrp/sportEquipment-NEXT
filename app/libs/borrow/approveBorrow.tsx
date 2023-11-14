const apiUrl = process.env.NEXT_PUBLIC_API_URL

type ResponseResp = {
  error?: string,
  result?: string
}

export default async function approveBorrow(borrowing_id: string, equipment_id: string): Promise<ResponseResp> {
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


        return await approveBorrow(borrowing_id, equipment_id);
      }
    }

    if (resp.status !== 200) {
      return { error: `${serverResp.error}` }
    }
    return { result: "approved" }
  } catch (error) {
    return { error: `${error}` }
  }
}
