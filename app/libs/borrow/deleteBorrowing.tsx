
const apiUrl = process.env.DEV_URL || "http://localhost:8080"

type ResponseResult = {
  error?: string,
  result?: string
}

export default async function deleteBorrowing(borrowingID: string, equipmentID: string): Promise<ResponseResult> {
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

    const resp = await fetch(`${apiUrl}/borrowing/${borrowingID}/${equipmentID}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
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


        return await deleteBorrowing(borrowingID, equipmentID);
      }
    }

    if (resp.status !== 200) {
      return { error: `${serverResp.error}` }
    }
    return { result: "deleted" }

  } catch (error) {
    return { error: `${error}` }
  }
}
