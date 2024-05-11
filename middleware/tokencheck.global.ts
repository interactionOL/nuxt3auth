const navCookieName = "navUrl";
const showDebug = true;
export default defineNuxtRouteMiddleware(async (to, from) =>
{
    const { loggedIn, user, currentProvider, refresh, login } = useOidcAuth();
    const navCookie = useCookie(navCookieName);

    function info(message: any, ...params:any[])
    {
        if (showDebug) {
            console.info(message, params);
        }
    }

    info("Middleware navigating from:", from, "to:", to);

    // If it is the home page. see if user is logged in and there is a page to get to.
    if (to.path === '/' && loggedIn && user.value?.accessToken !== null)
    {
        info("logged in and user is on homepage")
        if (navCookie.value?.length) {
            const url = navCookie.value;
            info("navigation cookies is set for url: ", url);
            navCookie.value = null; //Ensure only used once
            return navigateTo(url); //go to the page originally requested
          }
    }
    
    const isErrorPage = !(to.matched.length > 0);
    if (isErrorPage) {
      return;
    }

    //If have turned auth off on the page, or is part of the auth process
    if (to.meta.auth === false || to.path.startsWith("/auth")) {
        info("Auth not required or route started /auth");
      return;
    }

    if (user.value == null || user.value == undefined) {
        info("There is no user logged in, log in");
        navCookie.value = to.fullPath; //save where user was tring to get to so can continue journey post login
        login();
        return;
    }
    
    //Check the token is not about to expire in next 10 seconds, if so, refresh token
    if (user.value.expireAt < ((Date.now() / 1000) - 10000))
    {
        info("The token is now expired ", user)
        await refresh(); //Todo handle when a refresh token was not successful
        return;
    }
    info("The token is OK", user.value.expireAt, user.value.accessToken)
})