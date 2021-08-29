<script>
	import Navbar from '../components/Nav.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import Main from '../components/Main.svelte';
	import Logo from '../components/Logo.svelte';

	let open = false;
</script>

<svelte:head>
	<title>imit8</title>
</svelte:head>

<Sidebar bind:open />
<Navbar bind:sidebar={open} />
<Logo />

<style>
	:global(body) {
		padding: 0;
	}
</style>
