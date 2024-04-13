<template>
    <div>
        <h1>Secure</h1>
        <router-link to="/">Home</router-link>
    </div>
</template>

<script lang="ts">
//const { signIn, signOut, session, status, cookies, getProviders } = useAuth()

definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })

export default {
    
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>