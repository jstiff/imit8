<script>
	//import Logo from './Logo.svelte';
	import Hamburger from './Hamburger.svelte';
	import Menu from './Menu.svelte';
	export let user1;
	export let sidebar = false;
</script>

<header class="h-20 flex justify-between bg-gray-100 p-2 items-center text-gray-600 border-b-2">
	<nav class="flex">
		<Hamburger bind:open={sidebar} />
	</nav>

	<Menu user2={user1} />
</header>
