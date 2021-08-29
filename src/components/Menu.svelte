<script>
	import GitHubLogo from './GitHubLogo.svelte';
	export let user2;
	function log_out() {
		alert('logout');
	}
</script>

<nav class="hidden text-gray-500 uppercase font-extralight text-bold sm:block">
	{#if user2}
		<p>Welcome {user2}</p>
		<a href="/logout">
			<button>Log Out</button>
		</a>
	{:else}
		<GitHubLogo />
		<!-- <a href="/about" class="m-10 hover:text-gray-700 hover:no-underline">About</a>
	<a href="/contact" class="m-10 hover:text-gray-700 hover:no-underline">Contact</a> -->
	{/if}
</nav>
