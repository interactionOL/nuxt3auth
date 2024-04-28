import { useAuth } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) =>
{
    if (process.server) {
      return;
    }
    var { data, getSession, status, signIn } = useAuth();
    const session = await getSession({force:true});
    //console.log(to, from);
    console.log(session);

    console.log("Expiry on session", session.access_token_expiry);
    console.info("now", Date.now())

    if (session.access_token_expiry < (Date.now() / 1000)) {
        console.log("Token has expired", data)
        if (to.meta.auth === false)
        {
            console.log("Auth NOT required, continue");
        }
        else {
            console.log("Auth required, should goto 401 - " + status.value);

            // try and get a refresh token now.
            

             return signIn(undefined, { callbackUrl: to.path }) as ReturnType<
               typeof navigateTo
             >; //This loops and the token is never (re)set to have a new expiry time
        }
    }
})