const navCookieName = "navUrl";
export default defineNuxtRouteMiddleware(async (to, from) =>
{
    const { loggedIn, user, currentProvider, refresh, login } = useOidcAuth();
    const navCookie = useCookie(navCookieName);

    if (to.path === '/' && loggedIn)
    {
        if (navCookie.value?.length)
        {
            const url = navCookie.value;
            navCookie.value = null; // so we don't loop around
            return navigateTo(url);
        }
    }
    
    const isErrorPage = !(to.matched.length > 0);
    if (isErrorPage) {
      return;
    }

    //If have tuyrned auth off on the page, or is part of the auth process
    if (to.meta.auth === false || to.path.startsWith("/auth")) {
      return;
    }

    console.log("Logged In ", loggedIn)

    console.info("now", Date.now())

    if (user.value == null || user.value == undefined) {
        console.warn("There is no user logged in, log in");
        navCookie.value = to.fullPath;
        login();
        return;
    }
    if (user.value.expireAt < Date.now() / 1000)
    {
        console.warn("The token is now expired")
        refresh();
        return;
    }
    // if ((session.access_token_expiry as number) < (Date.now() / 1000)) {
    //     console.log("Token has expired", data)
    //     if (to.meta.auth === false)
    //     {
    //         console.log("Auth NOT required on current page, continue");
    //     }
    //     else {
    //         console.log("Auth required, should goto 401 - " + status.value);

    //         // try and get a refresh token now.
    //         //GetRefreshToken(session)

    //         const test = await fetch("/api/auth/refresh/duende-identity-server6", {
    //             method: "post"
    //         });
    //         console.log("test is ", test)

    //     }
    // }
})