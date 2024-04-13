

<script lang="ts" setup>
    const { signIn, signOut, session, status, cookies, getProviders } = useAuth()

</script>

<template>
    <div>
        <h1>Login</h1>
        <button @click="signIn('duende-identity-server6')">
            JS Sign In
        </button>
        <button @click="signIn('github')">
            Github Sign In
        </button>

        {{  JSON.stringify( getProviders()) }}

        <router-link to="/secure">Secure</router-link> | 
        <router-link to="/">Home</router-link>
    </div>
</template>