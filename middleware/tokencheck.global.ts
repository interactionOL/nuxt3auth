import { useAuth } from "#imports";
import GetRefreshToken from "~/services/TokenService";

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

    if ((session.access_token_expiry as number) < (Date.now() / 1000)) {
        console.log("Token has expired", data)
        if (to.meta.auth === false)
        {
            console.log("Auth NOT required on current page, continue");
        }
        else {
            console.log("Auth required, should goto 401 - " + status.value);

            // try and get a refresh token now.
            //GetRefreshToken(session)
            
            const test = await fetch("/api/auth/refresh/duende-identity-server6", {
                method: "post"
            });
            console.log("test is ", test)
             
        }
    }
})