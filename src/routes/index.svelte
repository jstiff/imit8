<script context="module">
	export async function load({ session }) {
		console.log('LOAD from index', session.user);
		return {
			props: {
				user: session.user
			}
		};
	}
</script>

<script>
	import Navbar from '../components/Nav.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import Main from '../components/Main.svelte';
	import Logo from '../components/Logo.svelte';
	export let user;
	let open = false;
</script>

<svelte:head>
	<title>imit8</title>
</svelte:head>

<Sidebar bind:open />
<Navbar bind:sidebar={open} user1={user} />
<Logo />
<p>{user}</p>

<style>
	:global(body) {
		padding: 0;
	}
</style>
