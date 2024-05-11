<script lang="ts" setup>

//const { signIn, signOut, status, getProviders, data } = useAuth();

const { user, loggedIn, currentProvider, refresh } = useOidcAuth()

function unixToDateTime(unixTimestamp: number): string {
    // Convert Unix timestamp to milliseconds
    const dateTime: Date = new Date(unixTimestamp * 1000);

    // Get each part of the date and time
    const day: string = ('0' + dateTime.getDate()).slice(-2);
    const month: string = ('0' + (dateTime.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const year: number = dateTime.getFullYear();
    const hours: string = ('0' + dateTime.getHours()).slice(-2);
    const minutes: string = ('0' + dateTime.getMinutes()).slice(-2);
	const seconds: string = ('0' + dateTime.getSeconds()).slice(-2);

    // Concatenate the date and time parts with "-"
    const formattedDateTime: string = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

</script>

<template>
	<div>
		<h1>Secure Page - Token Details</h1>
		<NuxtLink to="/">Home</NuxtLink> |
		<NuxtLink to="/Todos">ToDo List</NuxtLink>

		<div>
			<pre>Logged In : {{ loggedIn }}</pre>
			<pre v-if="loggedIn">
				User
				Logged in at {{ unixToDateTime(user.loggedInAt ?? 0) }}
				Updated at {{ unixToDateTime(user.updatedAt ?? 0) }}
				Expire at {{ unixToDateTime(user.expireAt ?? 0) }}
				Access Token {{ user.accessToken }}
				Claims {{ user.claims }}
				Can Refresh {{ user.canRefresh }}
			</pre>
			<pre>Provider : {{ currentProvider }}</pre>
		</div>


		<hr />
		<div>
			<button @click="refresh()">Refresh</button>
			<!-- <button @click="() => signOut()">Sign out</button> -->
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
