
const apiUrl = process.env.NEXT_PUBLIC_API_URL

type RequestResponse = {
  error?: string,
  result?: string
}

export default async function deleteEquipment(equipmentID: string | undefined): Promise<RequestResponse> {
  try {
    const tokenCookie = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    if (!tokenCookie) {
      return { error: "token is not found" }
    }

    const tokenValue = tokenCookie.split('=')[1]?.trim();
    if (!tokenValue) {
      return { error: 'Token has no value' };
    }

    const token = tokenValue;
    const resp = await fetch(`${apiUrl}/equipment/${equipmentID}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    const serverRes = await resp.json()
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
          if (refreshTokenResp.status === 401) {
            return { error: "token is expired" }
          }
        }

        const serverResp = await refreshTokenResp.json();
        document.cookie = 'token=;';
        document.cookie = `token=${serverResp.newAccessToken}`;


        return await deleteEquipment(equipmentID)
      }
      if (resp.status !== 200) {
        return { error: `${serverRes.error}` }
      }
    }
    return { result: "deleted" }
  } catch (error) {
    return { error: `${error}` }
  }
}
