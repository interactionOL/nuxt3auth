<template>
    <div>
        <h1>Secure</h1>
        <router-link to="/">Home</router-link>

        <div>
            <pre>{{ status }}</pre>
            <pre>{{ session?.user }}</pre>
            <pre>{{ cookies }}</pre>
        </div>

        <hr/>
        <div>
            <button @click="() => signOut()">Sign out</button>
        </div>

    </div>
</template>

<script lang="ts" setup>

definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })

const { signIn, signOut, session, status, cookies, getProviders } = useAuth()
        
</script>

<style lang="scss" scoped>

</style>