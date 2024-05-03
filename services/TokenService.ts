export default async function GetRefreshToken(token: any)
{
    try {
        //const { refreshToken } = useAuthState();
  //console.log("Refresh token", refreshToken);
  const url = `https://demo.duendesoftware.com/connect/token`;
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=refresh_token" +
      `&client_id=interactive.confidential.short` +
      `&client_secret=secret` +
      `&refresh_token=${token.refreshToken}`,
  });

  const res = await req.json();

  if (res.error) {
    return {
      ...token,
      error2: "RefreshAccessTokenExpired",
    };
  }
  return {
    ...token,
    accessToken: res.access_token,
    accessTokenExpires: Date.now() + res.expires_in * 1000,
    refreshToken: res.refresh_token ?? token.refreshToken, // Fall back to old refresh token
  };
} catch (error) {
  console.error(error);

  return {
    ...token,
    error1: "RefreshAccessTokenError",
  };
}
}