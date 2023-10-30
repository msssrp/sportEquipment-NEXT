const apiUrl = process.env.DEV_URL || "http://localhost:8080"

type Equipment = {
  name: string,
  category: string,
  description: string,
  quantity_available: string,
  condition: string,
  image_url: string,
}

type RequestResponse = {
  error?: string
  result?: string
}

export default async function addEquipment(equipment: Equipment): Promise<RequestResponse> {
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
    const resp = await fetch(`${apiUrl}/equipment`, {
      method: "POST",
      body: JSON.stringify(equipment),
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
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
          if (refreshTokenResp.status === 401) {
            return { error: "token is expired" }
          }
        }

        const serverResp = await refreshTokenResp.json();
        document.cookie = 'token=;';
        document.cookie = `token=${serverResp.newAccessToken}`;


        return await addEquipment(equipment);
      }
      if (resp.status !== 201) {
        return { error: `${serverResp.error}` }
      }
    }
    return { result: "added" }
  } catch (error) {
    return { error: `${error}` }
  }
}
